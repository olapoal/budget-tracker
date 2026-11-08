// netlify/functions/admin-buyers.js
// Endpoint API khusus Admin untuk manajemen data pembeli Aplikasi Budget Tracker Pro

exports.handler = async function(event, context) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders, body: "" };
    }

    const adminKey = event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
    const expectedKey = process.env.ADMIN_SECRET_KEY || "olapoal2026";

    if (adminKey !== expectedKey) {
        return {
            statusCode: 401,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Unauthorized: Kunci otentikasi admin salah." })
        };
    }

    try {
        let store = null;
        try {
            const { getStore } = require("@netlify/blobs");
            store = getStore("budget_buyers");
        } catch (e) {
            console.warn("Netlify Blobs load warning:", e.message);
        }

        // 1. GET: Ambil daftar seluruh pembeli
        if (event.httpMethod === "GET") {
            const buyers = [];

            if (store) {
                try {
                    const { blobs } = await store.list();
                    for (const blob of blobs) {
                        try {
                            const data = await store.get(blob.key, { type: "json" });
                            if (data) {
                                buyers.push(data);
                            }
                        } catch (itemErr) {
                            console.warn("Error reading blob key:", blob.key);
                        }
                    }
                } catch (listErr) {
                    console.warn("Blobs list error:", listErr.message);
                }
            }

            // Fallback / Tambahan dari Supabase jika dikonfigurasi
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

            if (supabaseUrl && supabaseKey && buyers.length === 0) {
                try {
                    const cleanUrl = supabaseUrl.replace(/\/$/, "");
                    const endpoint = `${cleanUrl}/rest/v1/budget_buyers?select=*&order=created_at.desc`;

                    const res = await fetch(endpoint, {
                        headers: {
                            "apikey": supabaseKey,
                            "Authorization": `Bearer ${supabaseKey}`
                        }
                    });

                    if (res.ok) {
                        const rows = await res.json();
                        return {
                            statusCode: 200,
                            headers: corsHeaders,
                            body: JSON.stringify({ buyers: rows || [], source: "supabase" })
                        };
                    }
                } catch (supaErr) {
                    console.warn("Supabase admin fetch error:", supaErr);
                }
            }

            const ownerEmail = "olapoal.artgallery@gmail.com";
            if (!buyers.some(b => (b.email || "").toLowerCase() === ownerEmail)) {
                buyers.unshift({
                    email: ownerEmail,
                    name: "Owner / Pengembang (Alrizal)",
                    order_id: "OWNER-ACCESS-001",
                    created_at: new Date().toISOString(),
                    note: "Akun Utama Pemilik [BTR]"
                });
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({ buyers: buyers, source: "netlify_blobs" })
            };
        }

        // 2. POST: Tambah email pembeli manual (Whitelist / Pemberian Akses)
        if (event.httpMethod === "POST") {
            const body = JSON.parse(event.body || "{}");
            const email = (body.email || "").trim().toLowerCase();
            const name = (body.name || "Akses Manual Admin").trim();
            const note = (body.note || "Ditambahkan via Admin Dashboard").trim();

            if (!email || !email.includes("@")) {
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: "Email pembeli tidak valid." })
                };
            }

            const record = {
                email: email,
                name: name,
                order_id: `MANUAL-${Date.now()}`,
                product_name: "[BTR] Aplikasi Budget Tracker Pro",
                phone: body.phone || "-",
                note: note,
                created_at: new Date().toISOString()
            };

            if (store) {
                await store.setJSON(email, record);
            }

            // Simpan juga ke Supabase jika aktif
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
            if (supabaseUrl && supabaseKey) {
                try {
                    const cleanUrl = supabaseUrl.replace(/\/$/, "");
                    await fetch(`${cleanUrl}/rest/v1/budget_buyers`, {
                        method: "POST",
                        headers: {
                            "apikey": supabaseKey,
                            "Authorization": `Bearer ${supabaseKey}`,
                            "Content-Type": "application/json",
                            "Prefer": "resolution=merge-duplicates"
                        },
                        body: JSON.stringify(record)
                    });
                } catch (e) {}
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    message: `Email ${email} berhasil diaktivasi manual!`,
                    buyer: record
                })
            };
        }

        // 3. DELETE: Hapus akses pembeli
        if (event.httpMethod === "DELETE") {
            const body = JSON.parse(event.body || "{}");
            const email = (body.email || "").trim().toLowerCase();

            if (!email) {
                return {
                    statusCode: 400,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: "Email harus diisi untuk dihapus." })
                };
            }

            if (store) {
                await store.delete(email);
            }

            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
            if (supabaseUrl && supabaseKey) {
                try {
                    const cleanUrl = supabaseUrl.replace(/\/$/, "");
                    await fetch(`${cleanUrl}/rest/v1/budget_buyers?email=eq.${encodeURIComponent(email)}`, {
                        method: "DELETE",
                        headers: {
                            "apikey": supabaseKey,
                            "Authorization": `Bearer ${supabaseKey}`
                        }
                    });
                } catch (e) {}
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    message: `Akses pembeli ${email} berhasil dihapus.`
                })
            };
        }

        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };

    } catch (err) {
        console.error("Admin handler error:", err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: err.message })
        };
    }
};
