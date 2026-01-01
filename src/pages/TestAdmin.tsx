import React, { useMemo, useState } from "react";

const TestAdmin = () => {
    const product = useMemo(
        () => ({
            name: "منتج فاخر",
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        }),
        []
    );
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [wilaya, setWilaya] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleWhatsAppOrder = () => {
        const message = `New Order:\nProduct: ${product.name}\nName: ${name}\nPhone: ${phone}\nWilaya: ${wilaya}\nQuantity: ${quantity}`;
        const url = `https://wa.me/213771514101?text=${encodeURIComponent(
            message
        )}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="relative overflow-hidden rounded-3xl bg-black/5">
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/HERO%20BG%20.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative p-10 text-white">
                        <h2 className="text-3xl font-semibold">
                            عنوان الهيرو هنا
                        </h2>
                        <p className="mt-3 max-w-xl text-sm text-white/90">
                            نص تعريفي قصير فوق فيديو الخلفية لزيادة التحويل.
                        </p>
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-80 w-full rounded-2xl object-cover shadow"
                        />
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-20 rounded-xl bg-white shadow-inner"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-900">
                                    {product.name}
                                </h1>
                                <p className="mt-3 text-gray-600">
                                    وصف مختصر للمنتج مع مميزات جذابة ولماذا يستحق
                                    الشراء.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-white p-5 shadow-sm">
                                <p className="text-sm font-semibold text-gray-700">
                                    تفاصيل إضافية
                                </p>
                                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                    <li>خامة عالية الجودة</li>
                                    <li>توصيل سريع لجميع الولايات</li>
                                    <li>ضمان استرجاع خلال 7 أيام</li>
                                </ul>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-12 w-12 rounded-xl object-cover"
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        نموذج الطلب
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-900">
                                        {product.name}
                                    </h2>
                                </div>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        الاسم
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                        placeholder="اكتب الاسم الكامل"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        رقم الهاتف
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(event) =>
                                            setPhone(event.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                        placeholder="مثال: 0550 000 000"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        الولاية
                                    </label>
                                    <input
                                        value={wilaya}
                                        onChange={(event) =>
                                            setWilaya(event.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                        placeholder="اختر ولايتك"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        الكمية
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(event) =>
                                            setQuantity(
                                                Number(event.target.value) || 1
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleWhatsAppOrder}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-500"
                            >
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                    <svg
                                        viewBox="0 0 32 32"
                                        className="h-4 w-4 fill-white"
                                        aria-hidden="true"
                                    >
                                        <path d="M19.11 17.32c-.27-.14-1.6-.78-1.84-.87-.25-.1-.43-.14-.6.14-.18.27-.69.86-.85 1.03-.16.18-.32.2-.6.07-.27-.14-1.15-.42-2.2-1.34-.81-.72-1.36-1.6-1.52-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.1-.18.05-.34-.02-.48-.07-.14-.6-1.45-.83-1.99-.22-.52-.45-.45-.6-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.98 2.68 1.12 2.86.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.82-1.27.22-.62.22-1.15.15-1.27-.07-.12-.25-.2-.52-.34z" />
                                        <path d="M16.02 5.33c-5.92 0-10.74 4.82-10.74 10.74 0 1.89.5 3.74 1.45 5.38l-1.54 5.63 5.77-1.51c1.58.86 3.35 1.31 5.06 1.31h.01c5.92 0 10.74-4.82 10.74-10.74 0-5.92-4.82-10.74-10.74-10.74zm0 19.78h-.01c-1.61 0-3.2-.43-4.58-1.24l-.33-.19-3.42.9.91-3.33-.22-.34a9.2 9.2 0 0 1-1.43-4.98c0-5.08 4.13-9.21 9.2-9.21 5.08 0 9.21 4.13 9.21 9.21 0 5.08-4.13 9.21-9.21 9.21z" />
                                    </svg>
                                </span>
                                إتمام الطلب عبر واتساب
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestAdmin;
