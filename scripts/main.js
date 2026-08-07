function scrollCarousel(direction) {
    const container = document.getElementById('carousel');
    const scrollAmount = 340; // Card width + gap
    if (direction === 1) {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// ==========================================
// Video Carousel Functionality
// ==========================================
let currentVideoSlide = 0;
const totalVideoSlides = 7;

function changeVideoSlide(direction) {
    let newSlide = currentVideoSlide + direction;
    
    // Wrap around
    if (newSlide < 0) newSlide = totalVideoSlides - 1;
    if (newSlide >= totalVideoSlides) newSlide = 0;
    
    goToVideoSlide(newSlide);
}

function goToVideoSlide(index) {
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.video-dot');
    
    if (slides.length === 0 || index === currentVideoSlide) return;
    
    // Pause and reset the current video by reloading the iframe
    const currentIframe = slides[currentVideoSlide].querySelector('iframe');
    if (currentIframe) {
        const src = currentIframe.src;
        currentIframe.src = '';
        currentIframe.src = src;
    }
    
    // Hide current slide and disable interaction
    slides[currentVideoSlide].classList.remove('opacity-100', 'z-10');
    slides[currentVideoSlide].classList.add('opacity-0', 'pointer-events-none');
    
    // Update dot indicators
    dots[currentVideoSlide].classList.remove('bg-islamic-gold');
    dots[currentVideoSlide].classList.add('bg-gray-300');
    
    // Update current slide index
    currentVideoSlide = index;
    
    // Show new slide and enable interaction
    slides[currentVideoSlide].classList.remove('opacity-0', 'pointer-events-none');
    slides[currentVideoSlide].classList.add('opacity-100', 'z-10');
    
    // Update dot indicators
    dots[currentVideoSlide].classList.remove('bg-gray-300');
    dots[currentVideoSlide].classList.add('bg-islamic-gold');
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// ==========================================
// Language Toggle Functionality
// ==========================================
const enToUr = {
    "Home": "ہوم",
    "Curriculum": "نصاب",
    "Our Mission": "ہمارا مقصد",
    "Contact": "رابطہ کریں",
    "Tarbiyat cultivating the heart, mind and soul": "تربیت جو دل، دماغ اور روح کو سنوارے",
    "plus": "اور",
    "Maktab Al-Hind": "مكتب الہند",
    "Al-Hind Hifz Academy": "الہند حفظ اکیڈمی",
    "Affiliated to Deeni Taleemi Board, Jamiat Ulema-e-Hind": "دینی تعلیمی بورڈ، جمعیت علمائے ہند سے ملحق",
    "Our mission is very clear: to prepare individuals who are firm in their faith, aware of the demands of the world, and who light the candle of goodness in society through their character, knowledge, and actions. We invite you all from the depths of our hearts to make your sons, daughters, and entire household a part of this beautiful educational journey. Let us together raise a generation that is a beautiful example of knowledge, faith, and character—a generation that not only walks on the path of religion but also achieves eminence in the world.": "ہمارا مقصد بالکل واضح ہے: ایسے افراد تیار کرنا جو اپنے ایمان میں مضبوط ہوں، دنیا کے تقاضوں سے باخبر ہوں، اور جو اپنے کردار، علم اور اعمال کے ذریعے معاشرے میں بھلائی کی شمع روشن کریں۔ ہم آپ سب کو دل کی گہرائیوں سے دعوت دیتے ہیں کہ آپ اپنے بیٹوں، بیٹیوں اور پورے گھرانے کو اس خوبصورت تعلیمی سفر کا حصہ بنائیں۔ آئیے مل کر ایک ایسی نسل کی پرورش کریں جو علم، ایمان اور کردار کی ایک خوبصورت مثال ہو—ایک ایسی نسل جو نہ صرف دین کی راہ پر چلے بلکہ دنیا میں بھی مقام حاصل کرے۔",
    "✦ For both boys and girls ✦": "✦ لڑکوں اور لڑکیوں دونوں کے لیے ✦",
    "Our Curriculum": "ہمارا نصاب",
    "Maktab Programs": "مکتب پروگرامز",
    "Foundation of Quranic Learning": "قرآنی تعلیم کی بنیاد",
    "Qaida": "قاعدہ",
    "- Learn Tajweed rules": "- تجوید کے اصول سیکھیں",
    "Nazarah": "ناظرہ",
    "- Learn to read Quran": "- قرآن پڑھنا سیکھیں",
    "Surah memorization": "سورتیں حفظ کریں",
    "Hifz revision": "حفظ کی دہرائی",
    "Learn More": "مزید جانیں",
    "Enroll Now": "ابھی داخلہ لیں",
    "Hifz Programs (full-time)": "حفظ پروگرامز (کل وقتی)",
    "Memorization excellence": "حفظ میں مہارت",
    "Memorize complete Quran": "مکمل قرآن حفظ کریں",
    "Easy techniques for fast memorization": "تیزی سے حفظ کرنے کے آسان طریقے",
    "Revision plan & guidance": "دہرائی کا منصوبہ اور رہنمائی",
    "Tajweed correction": "تجوید کی درستی",
    "Personal support from teacher": "استاد کی جانب سے ذاتی توجہ",
    "Other Programs": "دیگر پروگرامز",
    "Customized after-school programs": "اسکول کے بعد کے کسٹمائزڈ پروگرامز",
    "Memorize any surah of your choice": "اپنی پسند کی کوئی بھی سورت حفظ کریں",
    "Nasihah Series": "نصیحت سیریز",
    "- Masail/Aqaid": "- مسائل/عقائد",
    "Seeratun Nabi": "سیرت النبی",
    "(PBUH)": "(صلی اللہ علیہ وسلم)",
    "Akhlaq & Character Building": "اخلاق اور کردار سازی",
    "Daily Duas & Supplications": "روزمرہ کی دعائیں",
    "Contact Us": "ہم سے رابطہ کریں",
    "Scan for Location": "لوکیشن کے لیے اسکین کریں",
    "Our Locations": "ہمارے مقامات",
    "Branch 1": "برانچ 1",
    "Gali No. 3, near Ashrafiya Masjid": "گلی نمبر 3، اشرفیہ مسجد کے قریب",
    "Kardampuri, Shahadara": "کردم پوری، شاہدرہ",
    "New Delhi - 110094": "نئی دہلی - 110094",
    "Branch 2": "برانچ 2",
    "Gali No. 35, near Post Office": "گلی نمبر 35، پوسٹ آفس کے قریب",
    "Zakir Nagar (Dhalan), Okhla": "ذاکر نگر (ڈھلان)، اوکھلا",
    "New Delhi - 110025": "نئی دہلی - 110025",
    "Call Us": "ہمیں کال کریں",
    "Email Us": "ہمیں ای میل کریں",
    "A dedicated full-time program for students who wish to commit the entire Quran to memory, with a focus on retention and Tajweed.": "ایسا مکمل وقتی پروگرام جو ان طلباء کے لیے مختص ہے جو پورے قرآن کو حفظ کرنا چاہتے ہیں، جس میں یادداشت اور تجوید پر خاص توجہ دی جاتی ہے۔",
    "Foundation of Quranic Learning. A comprehensive program designed to teach children the basics of reading the Quran with Tajweed, along with essential Islamic knowledge.": "قرآنی تعلیم کی بنیاد۔ ایک جامع پروگرام جو بچوں کو تجوید کے ساتھ قرآن پڑھنے کی بنیادی باتیں اور ضروری اسلامی علم سکھانے کے لیے بنایا گیا ہے۔",
    "School ends, but your journey to eternal reward begins! The precious time after school is a golden opportunity to memorize the Holy Quran – the most rewarding investment for this life and the Hereafter.": "اسکول ختم ہوتا ہے، لیکن ابدی اجر کا سفر شروع ہوتا ہے! اسکول کے بعد کا قیمتی وقت قرآن مجید حفظ کرنے کا سنہری موقع ہے – جو اس دنیا اور آخرت کے لیے سب سے فائدہ مند سرمایہ کاری ہے۔",
    "per month": "فی مہینہ",
    "Fees:": "فیس:",
    "Complete Duration of Course": "کورس کی مکمل مدت",
    "Timing of Classes": "کلاسز کے اوقات",
    "Schedule Plan": "شیڈول پلان",
    "About Us": "ہمارے بارے میں"
};

const urToEn = {};
for (const [en, ur] of Object.entries(enToUr)) {
    urToEn[ur] = en;
}

let currentLang = localStorage.getItem('maktabLang') || 'en';

// Helper to instantly apply state when loading page.
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('maktabLang') === 'ur') {
        // if urdu is set, temporarily switch to en, and force toggle.
        currentLang = 'en'; 
        toggleLanguage();
    }
});

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    localStorage.setItem('maktabLang', currentLang);
    const dict = currentLang === 'ur' ? enToUr : urToEn;
    
    // Update translation button text
    const btns = document.querySelectorAll('.translate-btn');
    btns.forEach(btn => {
        btn.innerText = currentLang === 'ur' ? "English" : "اردو";
    });

    // Walk the DOM and replace strings
    replaceTextNodes(document.body, dict);
    
    // Switch document direction
    if (currentLang === 'ur') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('font-urdu');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('font-urdu');
    }
}

function replaceTextNodes(node, dict) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue.trim();
        // Allow collapsing of multiple spaces for matching
        const normalizedText = text.replace(/\s+/g, ' ');
        if (normalizedText && dict[normalizedText]) {
            node.nodeValue = node.nodeValue.replace(text, dict[normalizedText]);
        }
    } else {
        if (node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
            for (let i = 0; i < node.childNodes.length; i++) {
                replaceTextNodes(node.childNodes[i], dict);
            }
        }
    }
}

Object.assign(enToUr, {
    "The Hifz course generally takes more than 3 years to complete. However depending on the student's pace, it can be completed in a shorter duration.": "حفظ کا کورس عام طور پر مکمل ہونے میں 3 سال سے زیادہ کا وقت لیتا ہے۔ البتہ طالب علم کی رفتار کے لحاظ سے اسے کم مدت میں بھی مکمل کیا جا سکتا ہے۔",
    "Timing of this program is from Fajr till Isha.": "اس پروگرام کا وقت فجر سے لے کر عشاء تک ہے۔",
    "After Fajr:": "فجر کے بعد:",
    "Sabaq revising and listening till 7:45 AM": "سبق کی دہرائی اور 7:45 تک سننا",
    "7:45 AM - 8:30 AM:": "صبح 7:45 - 8:30:",
    "Break time": "وقفہ",
    "8:30 AM - 10:30 AM:": "صبح 8:30 - 10:30:",
    "Sabqan Para": "سبقاً پارہ",
    "10:30 AM - 11:30 AM:": "صبح 10:30 - 11:30:",
    "Urdu reading and writing": "اردو پڑھنا اور لکھنا",
    "11:30 AM - 2:00 PM:": "صبح 11:30 - دوپہر 2:00:",
    "Lunch break (at Home)": "دوپہر کے کھانے کا وقفہ (گھر پر)",
    "2:00 PM - 4:30 PM:": "دوپہر 2:00 - شام 4:30:",
    "Aamokhta (Previous lesson)": "آموختہ (پچھلا سبق)",
    "Asr to Maghrib:": "عصر سے مغرب تک:",
    "Play time in Academy's ground/Home": "اکیڈمی کے گراؤنڈ/گھر میں کھیلنے کا وقت",
    "After Maghrib:": "مغرب کے بعد:",
    "Learning the new lesson of Quran": "قرآن کا نیا سبق سیکھنا",
    "After Isha:": "عشاء کے بعد:",
    "Go home": "گھر جانا",
    "Complete Quran Memorization": "مکمل قرآن حفظ کرنا",
    "Tajweed Mastery": "تجوید میں مہارت",
    "Revision Techniques": "دہرائی کی تکنیک",
    "Similar Ayahs (Mutashabihat)": "مشابہ آیات (متشابہات)",
    "Hifz Programs": "حفظ پروگرامز",
    "Topics Covered": "احاطہ کردہ موضوعات",
    "3-5 years (depending on student pace)": "3-5 سال (طالب علم کی رفتار پر منحصر ہے)",
    "Batches start from 3:00PM to 9:00PM on Mondays to Saturdays. Each batch is of 1 hour. Sundays will be off. Please check the schedule plan given below.": "بیچ دوپہر 3:00 بجے سے رات 9:00 بجے تک پیر سے ہفتہ تک شروع ہوتے ہیں۔ ہر بیچ 1 گھنٹے کا ہوتا ہے۔ اتوار کو چھٹی ہوگی۔ براہ کرم نیچے دیا گیا شیڈول پلان چیک کریں۔",
    "After Asr (3:00 PM onwards):": "عصر کے بعد (دوپہر 3:00 بجے کے بعد):",
    "Classes focus on basic Quranic reading (Qaida/Nazira) with Tajweed rules.": "کلاسز تجوید کے اصولوں کے ساتھ بنیادی قرآن خوانی (قاعدہ/ناظرہ) پر مرکوز ہیں۔",
    "After Maghrib:": "مغرب کے بعد:",
    "Students will learn basic Islamic teachings, Duas, and short Surahs alongside their reading practice.": "طلباء اپنی پڑھائی کی مشق کے ساتھ بنیادی اسلامی تعلیمات، دعائیں اور چھوٹی سورتیں سیکھیں گے۔",
    "Qaida to Quran transition": "قاعدہ سے قرآن تک منتقلی",
    "Proper Arabic pronunciation (Makharij)": "صحیح عربی تلفظ (مخارج)",
    "Essential Islamic knowledge": "ضروری اسلامی علم",
    "Character building (Tarbiyat)": "کردار سازی (تربیت)",
    "The duration of this course depends on the individual student's requirements and commitment.": "اس کورس کی مدت ہر طالب علم کی ضروریات اور لگن پر منحصر ہے۔",
    "Timing of this program is from 3:00 PM to 9:00 PM on Mondays to Saturdays.": "اس پروگرام کا وقت 3:00 بجے سے رات 9:00 بجے تک پیر سے ہفتہ تک ہے۔",
    "Flexible Scheduling:": "لچکدار شیڈول:",
    "Students can choose hours between 3 PM and 9 PM that best fit their school schedules.": "طلباء دوپہر 3 بجے سے رات 9 بجے کے درمیان اپنی مرضی کے اوقات منتخب کر سکتے ہیں جو ان کے اسکول کے شیڈول کے مطابق ہوں۔",
    "Customized Learning Plan:": "اپنی مرضی کا سیکھنے کا منصوبہ:",
    "Each student receives a personalized plan tailored to their goals, whether it's memorizing specific Surahs or improving Tajweed.": "ہر طالب علم کو ان کے مقاصف کے مطابق ایک ذاتی نوعیت کا منصوبہ ملتا ہے، چاہے وہ مخصوص سورتوں کو حفظ کرنا ہو یا تجوید کو بہتر بنانا۔",
    "Part-time Hifz": "جز وقتی حفظ",
    "Selected Surah Memorization": "منتخب سورتوں کا حفظ",
    "Advanced Tajweed Sessions": "اعلیٰ تجوید سیشن",
    "Islamic Studies & Masail": "اسلامی علوم اور مسائل"
});

for (const [en, ur] of Object.entries(enToUr)) {
    urToEn[ur] = en;
}

Object.assign(enToUr, {
    "Topics": "موضوعات"
});
for (const [en, ur] of Object.entries(enToUr)) {
    urToEn[ur] = en;
}
