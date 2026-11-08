// netlify/functions/lynk-webhook.js
// Endpoint ini menerima notifikasi saat customer selesai membayar di Lynk.id

exports.handler = async function(event, context) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const payload = JSON.parse(event.body || "{}");
        console.log("Lynk.id webhook incoming payload:", JSON.stringify(payload));

        // Ekstraksi data customer dari berbagai format payload Lynk.id
        const email = (
            payload.customer_email ||
            payload.email ||
            payload.data?.customer_email ||
            payload.data?.email ||
            payload.buyer_email ||
            payload.customer?.email ||
            ""
        ).trim().toLowerCase();

        const name = (
            payload.customer_name ||
            payload.name ||
            payload.data?.customer_name ||
            payload.data?.name ||
            payload.customer?.name ||
            "Pembeli Lynk.id"
        );

        const orderId = (
            payload.order_id ||
            payload.transaction_id ||
            payload.id ||
            payload.data?.order_id ||
            payload.data?.id ||
            `LYNK-BUDGET-${Date.now()}`
        );

        const phone = (
            payload.customer_phone ||
            payload.phone ||
            payload.data?.customer_phone ||
            payload.data?.phone ||
            ""
        );

        const productName = (
            payload.product_name ||
            payload.product ||
            payload.title ||
            payload.item_name ||
            payload.data?.product_name ||
            payload.data?.title ||
            ""
        );

        // Filter Proteksi Multi-Produk: Jika ada nama produk tapi bukan produk [BTR], lewati transaksi ini
        const isBTRProduct = productName.toUpperCase().includes("[BTR]") || 
                             productName.toUpperCase().includes("[BUDGET]") || 
                             productName.toLowerCase().includes("budget tracker") ||
                             productName.toLowerCase().includes("btr");

        if (productName && !isBTRProduct) {
            console.log(`Transaksi diabaikan karena bukan produk BTR: ${productName}`);
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: false,
                    ignored: true,
                    message: `Transaksi diabaikan: produk '${productName}' bukan produk [BTR] Budget Tracker.`
                })
            };
        }

        if (!email || !email.includes("@")) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: "Email customer tidak valid dalam payload Lynk.id" })
            };
        }

        const buyerRecord = {
            email: email,
            name: name,
            phone: phone,
            order_id: orderId,
            product_name: productName || "[BTR] Aplikasi Budget Tracker Pro",
            created_at: new Date().toISOString()
        };

        let savedToBlobs = false;
        let savedToSupabase = false;

        // 1. Simpan ke Netlify Blobs (Database Resmi Netlify)
        try {
            const { getStore } = require("@netlify/blobs");
            const store = getStore("budget_buyers");
            await store.setJSON(email, buyerRecord);
            savedToBlobs = true;
            console.log(`Berhasil menyimpan pembeli ke Netlify Blobs: ${email}`);
        } catch (blobsErr) {
            console.warn("Gagal simpan ke Netlify Blobs:", blobsErr.message);
        }

        // 2. Simpan ke Supabase jika ada konfigurasi ENV (Opsional)
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseKey) {
            try {
                const cleanUrl = supabaseUrl.replace(/\/$/, "");
                const endpoint = `${cleanUrl}/rest/v1/budget_buyers`;

                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "apikey": supabaseKey,
                        "Authorization": `Bearer ${supabaseKey}`,
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates"
                    },
                    body: JSON.stringify(buyerRecord)
                });

                if (res.ok) {
                    savedToSupabase = true;
                    console.log(`Berhasil menyimpan pembeli ke Supabase: ${email}`);
                }
            } catch (supaErr) {
                console.warn("Gagal simpan ke Supabase:", supaErr.message);
            }
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                message: `Email ${email} berhasil diaktivasi untuk Aplikasi Budget Tracker Pro.`,
                savedToBlobs,
                savedToSupabase
            })
        };

    } catch (err) {
        console.error("Lynk webhook internal error:", err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: err.message })
        };
    }
};
