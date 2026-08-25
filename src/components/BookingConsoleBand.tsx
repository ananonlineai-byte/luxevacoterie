import React, { useState } from 'react';
import { Calendar, Clock, Check, MessageCircle, Heart, Tag } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { ServiceCategory } from '../types';

interface BookingConsoleBandProps {
  selectedServices: ServiceCategory[];
  onToggleService: (service: ServiceCategory) => void;
  onOpenLineQr: () => void;
}

export const BookingConsoleBand: React.FC<BookingConsoleBandProps> = ({
  selectedServices,
  onToggleService,
  onOpenLineQr,
}) => {
  const { content, addBooking } = useCms();
  const { language, t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState('2024-08-15');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [lineId, setLineId] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Calculate pricing
  const subtotal = selectedServices.reduce((acc, s) => acc + s.originalPrice, 0);
  const discount = Math.round(subtotal * 0.3); // 30% off
  const total = subtotal - discount;

  const timeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert(language === 'th' ? 'กรุณาเลือกบริการอย่างน้อย 1 รายการ' : 'Please select at least one ritual to book.');
      return;
    }
    if (!clientName || !phone) {
      alert(language === 'th' ? 'กรุณากรอกชื่อและเบอร์โทรศัพท์' : 'Please fill in your name and phone number.');
      return;
    }

    const newBooking = {
      clientName,
      phone,
      lineId,
      date: selectedDate,
      time: selectedTime,
      selectedServices,
      totalOriginal: subtotal,
      totalDiscounted: total,
    };

    addBooking(newBooking);
    setConfirmationNumber(`LC-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsBooked(true);
  };

  return (
    <section id="booking" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Background ambient seal */}
      <div className="absolute -bottom-20 -left-20 font-didone text-[20vw] font-light text-[#C5A059]/[0.03] select-none pointer-events-none">
        {content.hero.headlineMonth || 'AUGUST'}
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#FBF8F3] text-[#63222D] editorial-furniture text-[10px] sm:text-xs mb-3">
            <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{language === 'th' ? 'สิทธิพิเศษช่วงเปิดตัว (GRAND OPENING)' : 'GRAND OPENING CELEBRATION'}</span>
          </div>

          <h2 className="font-didone text-3xl sm:text-5xl font-bold text-[#63222D] tracking-tight uppercase mb-3">
            {language === 'th' ? `จองคิวเดือน ${content.hero.headlineMonth} รับส่วนลดพิเศษ ${content.hero.discountPercent}` : `Reserve In ${content.hero.headlineMonth} & Save ${content.hero.discountPercent}`}
          </h2>
          <p className="font-didone italic text-sm sm:text-base text-[#1E1718]/70 max-w-xl mx-auto">
            {language === 'th' ? `รับสิทธิพิเศษเปิดตัวส่วนลด ${content.hero.discountPercent} สำหรับทุกคอร์สสปาและทำเล็บออร์แกนิกเกาหลี เมื่อจองในเดือน ${content.hero.headlineMonth}` : `Book your session in ${content.hero.headlineMonth} to enjoy our opening privilege on all Korean nail, pedicure, and botanical spa rituals.`}
          </p>
        </div>

        {/* 2 Column Layout: Booking Form + LINE Connect Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Booking Terminal (8 cols) */}
          <div className="lg:col-span-8 bg-[#FBF8F3] rounded-3xl border-2 border-[#C5A059]/40 p-6 sm:p-10 shadow-xl">
            
            {isBooked ? (
              <div className="text-center py-10 px-4">
                <div className="w-20 h-20 rounded-full bg-[#63222D] text-[#EBDCB9] flex items-center justify-center mx-auto mb-6 shadow-xl border-2 border-[#C5A059]">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="font-didone text-3xl font-bold text-[#63222D] uppercase">
                  {language === 'th' ? 'ยืนยันการจองคิว VIP เรียบร้อยแล้ว' : 'VIP Reservation Confirmed'}
                </h3>
                <p className="font-cinzel text-xs text-[#C5A059] tracking-widest mt-1 uppercase">
                  {content.brand.salonName} · {confirmationNumber} · {content.hero.headlineMonth} {content.hero.discountPercent}
                </p>

                {/* Reservation Voucher Plate */}
                <div className="bg-[#FAF6F0] rounded-2xl border border-[#C5A059]/40 p-6 max-w-md mx-auto my-6 text-left shadow-sm">
                  <div className="flex justify-between border-b border-[#C5A059]/20 pb-3 text-xs text-[#1E1718]/70">
                    <span>{language === 'th' ? 'ผู้รับบริการ:' : 'Guest:'} <strong className="text-[#63222D]">{clientName}</strong></span>
                    <span>{language === 'th' ? 'เบอร์โทร:' : 'Phone:'} <strong>{phone}</strong></span>
                  </div>
                  <div className="my-3 text-xs text-[#1E1718]/80">
                    <div className="font-semibold text-[#63222D] mb-1">{language === 'th' ? 'บริการที่เลือก:' : 'Allocated Services:'}</div>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {selectedServices.map(s => (
                        <li key={s.id}>{s.name} ({s.duration})</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between border-t border-[#C5A059]/20 pt-3 text-xs">
                    <span className="font-bold text-[#63222D]">{language === 'th' ? 'วันและเวลา:' : 'Date & Time:'}</span>
                    <span>{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-baseline mt-3 pt-2 border-t border-[#63222D]/10">
                    <span className="font-cinzel text-xs font-bold text-[#63222D]">{language === 'th' ? `ยอดรวมสุทธิ (ลด ${content.hero.discountPercent}):` : `Grand Total (${content.hero.discountPercent}):`}</span>
                    <span className="font-didone text-xl font-bold text-[#63222D]">฿{total.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-[#1E1718]/70 max-w-md mx-auto mb-6">
                  {language === 'th' ? `เจ้าหน้าที่จะติดต่อกลับผ่านทางโทรศัพท์หรือ LINE (${lineId || 'ที่ระบุ'}) เพื่อยืนยันเวลาก่อนเข้ารับบริการ` : `Our concierge will contact you via Phone or LINE (${lineId || 'Registered'}) prior to your visit.`}
                </p>

                <button
                  onClick={() => {
                    setIsBooked(false);
                    setClientName('');
                    setPhone('');
                    setLineId('');
                  }}
                  className="editorial-furniture text-xs px-6 py-2.5 bg-[#63222D] text-[#FBF8F3] hover:bg-[#46161F] transition-colors rounded-sm cursor-pointer"
                >
                  {language === 'th' ? 'ทำการจองคิวเพิ่ม' : 'MAKE ANOTHER RESERVATION'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                
                {/* Step 1: Select Rituals */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="editorial-furniture text-[#63222D] text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#63222D] text-[#EBDCB9] text-[10px] font-bold flex items-center justify-center">1</span>
                      {language === 'th' ? 'เลือกบริการที่ต้องการ (เลือกได้หลายรายการ)' : 'SELECT YOUR RITUALS (MULTI-SELECT)'}
                    </div>
                    <span className="text-[11px] text-[#C5A059] font-medium">{language === 'th' ? `คำนวณส่วนลด ${content.hero.discountPercent} อัตโนมัติ` : `${content.hero.discountPercent} Auto-Applied`}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.services.map((s) => {
                      const isSelected = selectedServices.some(item => item.id === s.id);
                      return (
                        <div
                          key={s.id}
                          onClick={() => onToggleService(s)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#FAF6F0] border-[#63222D] shadow-sm ring-1 ring-[#63222D]'
                              : 'bg-white/70 border-[#C5A059]/20 hover:border-[#C5A059]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                              isSelected ? 'bg-[#63222D] border-[#63222D] text-[#EBDCB9]' : 'border-gray-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <div className="font-didone text-sm font-bold text-[#63222D]">
                                {s.name}
                              </div>
                              <div className="text-[10px] text-[#1E1718]/60">{s.duration}</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 line-through mr-1">
                              ฿{s.originalPrice.toLocaleString()}
                            </span>
                            <span className="font-didone text-sm font-bold text-[#63222D]">
                              ฿{s.discountedPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="editorial-furniture text-[#63222D] text-xs flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 rounded-full bg-[#63222D] text-[#EBDCB9] text-[10px] font-bold flex items-center justify-center">2</span>
                      {language === 'th' ? 'เลือกวันที่ต้องการนัดหมาย' : 'SELECT APPOINTMENT DATE'}
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-sm text-[#1E1718] font-mono focus:outline-hidden focus:border-[#63222D]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="editorial-furniture text-[#63222D] text-xs flex items-center gap-2 mb-3">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      {language === 'th' ? 'เลือกช่วงเวลาที่สะดวก' : 'PREFERRED TIME SLOT'}
                    </div>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-sm text-[#1E1718] focus:outline-hidden focus:border-[#63222D]"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Contact Info */}
                <div>
                  <div className="editorial-furniture text-[#63222D] text-xs flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-[#63222D] text-[#EBDCB9] text-[10px] font-bold flex items-center justify-center">3</span>
                    {language === 'th' ? 'ข้อมูลสำหรับติดต่อของคุณ' : 'YOUR CONTACT DETAILS'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder={language === 'th' ? 'ชื่อ-นามสกุล *' : 'Full Name *'}
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-xs focus:outline-hidden focus:border-[#63222D]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder={language === 'th' ? 'เบอร์โทรศัพท์ *' : 'Mobile Phone *'}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-xs focus:outline-hidden focus:border-[#63222D]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder={language === 'th' ? 'LINE ID (ถ้ามี)' : 'LINE ID (Optional)'}
                        value={lineId}
                        onChange={(e) => setLineId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-xs focus:outline-hidden focus:border-[#63222D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Summary Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#1E1718]/60">
                      {language === 'th' ? 'รายการที่เลือก: ' : 'Selected: '}
                      <strong className="text-[#1E1718]">
                        {selectedServices.length} {language === 'th' ? 'รายการ' : 'Ritual(s)'}
                      </strong>
                    </div>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-sm text-gray-400 line-through">
                        ฿{subtotal.toLocaleString()}
                      </span>
                      <span className="font-didone text-2xl font-bold text-[#63222D]">
                        ฿{total.toLocaleString()}
                      </span>
                      <span className="bg-[#63222D] text-[#EBDCB9] text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-full">
                        -฿{discount.toLocaleString()} ({content.hero.discountPercent})
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#63222D] text-[#FBF8F3] editorial-furniture text-xs hover:bg-[#46161F] hover:shadow-lg transition-all rounded-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#EBDCB9]" />
                    <span>{language === 'th' ? 'ยืนยันการจองคิว VIP' : 'CONFIRM VIP BOOKING'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right: LINE QR Connect Card */}
          <div className="lg:col-span-4 bg-[#FBF8F3] rounded-3xl border-2 border-[#C5A059]/40 p-6 sm:p-8 shadow-xl text-center flex flex-col justify-between h-full">
            
            <div>
              {/* Header: LET'S CONNECT! */}
              <div className="editorial-furniture text-[#C5A059] text-xs mb-1">
                {language === 'th' ? 'ติดต่อเราโดยตรง' : "LET'S CONNECT!"}
              </div>
              <h3 className="font-didone text-2xl font-bold text-[#63222D] uppercase">
                {language === 'th' ? 'แอดไลน์เพื่อจองด่วน' : 'Add Us On LINE'}
              </h3>
              <p className="text-xs text-[#1E1718]/70 mt-1 font-didone italic">
                {language === 'th' ? 'สแกน QR Code เพื่อแชทสอบถามและรับการคอนเฟิร์มคิวทันที' : 'Scan the QR code to chat with our concierge & get instant priority confirmation.'}
              </p>

              {/* Realistic Luxury QR Code Container */}
              <div className="relative my-6 inline-block p-4 rounded-2xl bg-white border-2 border-[#C5A059]/50 shadow-md">
                
                {/* SVG LINE QR Code */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 relative flex items-center justify-center bg-white p-2">
                  {content.brand.qrCodeImage ? (
                    <img
                      src={content.brand.qrCodeImage}
                      alt={`LINE QR code for ${content.brand.salonName}`}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Top-Left Finder */}
                    <rect x="5" y="5" width="28" height="28" fill="#1C1514" rx="2" />
                    <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" rx="1" />
                    <rect x="13" y="13" width="12" height="12" fill="#1C1514" rx="1" />

                    {/* Top-Right Finder */}
                    <rect x="67" y="5" width="28" height="28" fill="#1C1514" rx="2" />
                    <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" rx="1" />
                    <rect x="75" y="13" width="12" height="12" fill="#1C1514" rx="1" />

                    {/* Bottom-Left Finder */}
                    <rect x="5" y="67" width="28" height="28" fill="#1C1514" rx="2" />
                    <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" rx="1" />
                    <rect x="13" y="75" width="12" height="12" fill="#1C1514" rx="1" />

                    {/* QR Data Dots */}
                    <rect x="38" y="10" width="5" height="5" fill="#1C1514" />
                    <rect x="48" y="10" width="5" height="5" fill="#1C1514" />
                    <rect x="58" y="10" width="5" height="5" fill="#1C1514" />
                    <rect x="38" y="20" width="5" height="5" fill="#1C1514" />
                    <rect x="50" y="20" width="8" height="5" fill="#1C1514" />
                    <rect x="38" y="30" width="5" height="5" fill="#1C1514" />
                    <rect x="48" y="30" width="5" height="5" fill="#1C1514" />

                    <rect x="10" y="38" width="5" height="5" fill="#1C1514" />
                    <rect x="20" y="38" width="5" height="5" fill="#1C1514" />
                    <rect x="30" y="38" width="5" height="5" fill="#1C1514" />
                    <rect x="70" y="38" width="5" height="5" fill="#1C1514" />
                    <rect x="80" y="38" width="5" height="5" fill="#1C1514" />

                    <rect x="10" y="48" width="5" height="5" fill="#1C1514" />
                    <rect x="20" y="48" width="5" height="5" fill="#1C1514" />
                    <rect x="70" y="48" width="5" height="5" fill="#1C1514" />
                    <rect x="85" y="48" width="5" height="5" fill="#1C1514" />

                    <rect x="38" y="65" width="5" height="5" fill="#1C1514" />
                    <rect x="48" y="65" width="5" height="5" fill="#1C1514" />
                    <rect x="58" y="65" width="5" height="5" fill="#1C1514" />
                    <rect x="70" y="65" width="5" height="5" fill="#1C1514" />
                    <rect x="85" y="65" width="5" height="5" fill="#1C1514" />

                    <rect x="38" y="75" width="5" height="5" fill="#1C1514" />
                    <rect x="50" y="75" width="8" height="5" fill="#1C1514" />
                    <rect x="70" y="75" width="5" height="5" fill="#1C1514" />
                    <rect x="80" y="75" width="5" height="5" fill="#1C1514" />

                    <rect x="38" y="85" width="5" height="5" fill="#1C1514" />
                    <rect x="48" y="85" width="5" height="5" fill="#1C1514" />
                    <rect x="60" y="85" width="8" height="5" fill="#1C1514" />
                    <rect x="80" y="85" width="8" height="5" fill="#1C1514" />

                    {/* Center LINE Badge Emblem */}
                    <rect x="36" y="36" width="28" height="28" fill="#06C755" rx="6" />
                    <text x="50" y="54" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                      LINE
                    </text>
                  </svg>
                  )}
                </div>

                <div className="font-mono text-xs font-bold text-[#06C755] mt-2">
                  {content.brand.lineId}
                </div>
              </div>

              {/* Heart accent */}
              <div className="flex justify-center">
                <Heart className="w-4 h-4 text-[#8B3A4A] fill-current animate-pulse" />
              </div>
            </div>

            <button
              onClick={onOpenLineQr}
              className="mt-6 w-full py-3 bg-[#06C755] text-white editorial-furniture text-xs hover:bg-[#05963E] transition-colors rounded-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'th' ? 'พูดคุยผ่าน LINE ทันที' : 'CHAT ON LINE APP'}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
