"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle, MapPin, Clock, Star, ChevronDown, Users, Award, Heart } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-black font-bold text-5xl">م</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-yellow-400 text-2xl font-bold"
              >
                مطعمي
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="h-1 bg-yellow-400 rounded-full mt-6 mx-auto max-w-[200px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-yellow-500/20"
        >
          <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-yellow-500/50">
                م
              </div>
              <h1 className="text-2xl font-bold text-yellow-400">مطعمي</h1>
            </motion.div>

            <nav className="hidden md:flex gap-8 text-sm">
              {["المنيو", "التوصيل", "تواصل"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${["menu", "delivery", "contact"][i]}`}
                  whileHover={{ y: -2 }}
                  className="hover:text-yellow-400 transition relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </nav>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/30"
            >
              اطلب الآن
            </motion.a>
          </div>
        </motion.header>

        {/* Hero with Parallax */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 -z-10">
            <Image src="/images/burger.jpg" alt="Hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]"></div>
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            variants={stagger}
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            className="text-center px-6 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-md border border-yellow-500/30 text-yellow-400 px-5 py-2 rounded-full text-sm">
                <Star size={16} fill="currentColor" />
                مطعم لبناني أصيل
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              طعم{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                لا يُقاوم!
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              ساندويشات، متبلات، مناقيش، ووجبات. توصيل لكل المناطق.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250, 204, 21, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                href="#menu"
                className="bg-yellow-400 text-black px-10 py-5 rounded-full text-lg font-bold transition inline-flex items-center justify-center gap-2"
              >
                استعرض المنيو
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                اطلب على واتساب
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-400"
          >
            <ChevronDown size={36} />
          </motion.div>
        </section>

        {/* About */}
        <section className="px-6 py-32 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-3xl overflow-hidden"
            >
              <Image src="/images/meal.jpg" alt="About" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeInUp} className="text-yellow-400 text-sm font-semibold tracking-[0.3em]">
                ABOUT US
              </motion.span>
              <motion.h3 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mt-4 mb-6">
                من نحن
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-gray-300 text-lg leading-relaxed mb-8">
                مطعمي هو وجهتك المفضلة للطعام اللبناني الأصيل. بدأنا رحلتنا بشغف للأكل الطازج واللذيذ،
                ومنذ ذلك الحين ونحن نقدم أطباقاً تُحضّر يومياً بأجود المكونات.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-300 text-lg leading-relaxed mb-8">
                نؤمن أن الطعام ليس مجرد وجبة، بل تجربة. لهذا نحرص على كل تفصيل، من اختيار المكونات
                إلى تقديم الطلب. رضاك هو هدفنا.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="text-yellow-400 mx-auto mb-2" size={32} />
                  <p className="text-2xl font-bold text-yellow-400">10K+</p>
                  <p className="text-gray-400 text-sm">عميل سعيد</p>
                </div>
                <div className="text-center">
                  <Award className="text-yellow-400 mx-auto mb-2" size={32} />
                  <p className="text-2xl font-bold text-yellow-400">5+</p>
                  <p className="text-gray-400 text-sm">سنوات خبرة</p>
                </div>
                <div className="text-center">
                  <Heart className="text-yellow-400 mx-auto mb-2" size={32} />
                  <p className="text-2xl font-bold text-yellow-400">100%</p>
                  <p className="text-gray-400 text-sm">طازج يومياً</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How to Order */}
        <section className="px-6 py-32 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-20">
            <motion.span variants={fadeInUp} className="text-yellow-400 text-sm font-semibold tracking-[0.3em]">
              HOW TO ORDER
            </motion.span>
            <motion.h3 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mt-4">
              كيف تطلب؟ 🤔
            </motion.h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "افتح واتساب", desc: "اضغط على الزر وافتح المحادثة", icon: "💬" },
              { step: "2", title: "اختر طلبك", desc: "شوف المنيو واختر اللي بدك ياه", icon: "🍔" },
              { step: "3", title: "استلم طلبك", desc: "جهز طلبك ورح يوصلك بسرعة", icon: "🛵" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-[#1A1A1A] p-8 rounded-3xl border border-yellow-500/20 text-center relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-2xl font-bold text-yellow-400 mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="px-6 py-32 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-20"
          >
            <motion.span variants={fadeInUp} className="text-yellow-400 text-sm font-semibold tracking-[0.3em]">
              OUR MENU
            </motion.span>
            <motion.h3 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mt-4">
              المنيو
            </motion.h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "🥙 ساندويشات", image: "/images/shawarma.jpg", items: ["زينغر", "توستر", "كرسيبي", "تشكن ساب", "فرانسيسكو"] },
              { title: "🥣 متبلات", image: "/images/mezze.jpg", items: ["فاهيتا", "أسكلوب", "طاووق", "ناغتس", "تشكن ساب"] },
              { title: "🫓 مناقيش", image: "/images/manakish.jpg", items: ["زعتر", "جبنة", "بيتزا", "لحم بعجين", "سبانخ"] },
              { title: "🍔 وجبات", image: "/images/meal.jpg", items: ["وجبة سندوش", "وجبة كرسيبي", "وجبة مشكل"] },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="bg-[#1A1A1A] rounded-3xl border border-yellow-500/20 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
                </div>
                <div className="p-8 -mt-12 relative">
                  <h4 className="text-3xl font-bold mb-6 text-yellow-400">{section.title}</h4>
                  <ul className="space-y-3 text-gray-300">
                    {section.items.map((item) => (
                      <motion.li
                        key={item}
                        whileHover={{ x: 8, color: "#FACC15" }}
                        className="flex items-center gap-3 transition-colors"
                      >
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Delivery */}
        <section id="delivery" className="px-6 py-32 bg-gradient-to-b from-[#111] to-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-20"
            >
              <motion.span variants={fadeInUp} className="text-yellow-400 text-sm font-semibold tracking-[0.3em]">
                DELIVERY
              </motion.span>
              <motion.h3 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mt-4">
                🛵 مناطق التوصيل
              </motion.h3>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { area: "الحوش", price: "300,000" },
                { area: "بتولاي", price: "200,000" },
                { area: "عين بعال", price: "100,000" },
                { area: "بصور", price: "500,000" },
              ].map((zone, i) => (
                <motion.div
                  key={zone.area}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="bg-[#1A1A1A] p-8 rounded-3xl border border-yellow-500/20 text-center hover:border-yellow-500/60 transition-colors"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <MapPin className="text-yellow-400" size={28} />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-yellow-400 mb-2">{zone.area}</h4>
                  <p className="text-gray-400">{zone.price} ل.ل</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-32 max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/10 rounded-full"
              >
                <Clock className="text-yellow-400" size={40} />
              </motion.div>
            </motion.div>
            <motion.h3 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
              اطلب الآن
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-gray-300 mb-12 text-xl">
              توصيل لكل المناطق
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/96112345678?text=مرحبا، بدي أطلب من مطعمي 🍔"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-green-600 transition inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={22} />
                اطلب على واتساب
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(250, 204, 21, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                href="tel:12345678"
                className="bg-yellow-400 text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
              >
                <Phone size={22} />
                12345678
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 text-gray-500 text-sm border-t border-yellow-500/20">
          © {new Date().getFullYear()} My Restaurant. All rights reserved.
        </footer>
      </main>
    </>
  );
}