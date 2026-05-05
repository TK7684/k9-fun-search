/**
 * Mock Google Sheet CSV data for testing.
 *
 * Column format (matches the real Google Sheet export):
 * Timestamp, Email, Handler Name, Phone, LINE ID, Dog Name, Breed, Dog Age, Dog Sex,
 * Health Confirmation, Consent, Liability, File Upload, Signature
 *
 * Edge cases included:
 * - Quoted field with comma: handler name "สมชาย, ใจดี" (row 2)
 * - Quoted field with comma: breed "โกลเด้น, รีทรีเวอร์" (row 8)
 * - Empty optional fields: Phone and/or LINE ID blank (rows 4, 6, 11)
 * - Duplicate dog+handler matching manual demo dog 1 (มอลลี่ / สมชาย ใจดี) for dedup testing (row 1)
 */

export const MOCK_SHEET_CSV = `Timestamp,Email,Handler Name,Phone,LINE ID,Dog Name,Breed,Dog Age,Dog Sex,Health Confirmation,Consent,Liability,File Upload,Signature
2026-05-28 08:30:00,somchai@example.com,สมชาย ใจดี,081-234-5678,@somchai,มอลลี่,เยอร์มัน เชเพิร์ด,3,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_aaa111
2026-05-28 09:15:00,"niran@example.com","สมชาย, ใจดี",082-345-6789,@niran_p,แสงดาว,โกลเด้น รีทรีเวอร์,5,เมีย,ยืนยัน,ยินยอม,ยินยอม,,sig_bbb222
2026-05-28 10:00:00,wilai@example.com,วิไล มุ่งมั่น,083-456-7890,@wilai_m,จูเนียร์,ลาบราดอร์,2,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_ccc333
2026-05-28 10:45:00,pisut@example.com,ปิยสุทธิ์ แก้วกลาง,,@pisut_k,ทับทิม,เบลเจียน มาลินอยส์,4,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_ddd444
2026-05-28 11:30:00,kanya@example.com,กัญญา สุขใจ,085-678-9012,@kanya_happy,มะลิ,บอร์เดอร์ คอลลี่,1,เมีย,ยืนยัน,ยินยอม,ยินยอม,,sig_eee555
2026-05-28 12:15:00,buncha@example.com,บัญชา ศรีสวัสดิ์,,,,เพชร,ร็อตไวเลอร์,6,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_fff666
2026-05-28 13:00:00,duangkamol@example.com,ดวงกมล พรหมมา,087-890-1234,@duang_p,อรุณ,ดอเบอร์แมน,3,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_ggg777
2026-05-28 13:45:00,chantima@example.com,จันทิมา นภาลัย,088-901-2345,@chan_nap,"พิกุล","โกลเด้น, รีทรีเวอร์",2,เมีย,ยืนยัน,ยินยอม,ยินยอม,,sig_hhh888
2026-05-28 14:30:00,ekachai@example.com,เอกชัย รุ่งโรจน์,089-012-3456,@ek_rung,วิเศษ,ฮัสกี้,4,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_iii999
2026-05-28 15:15:00,phatcharin@example.com,พัชรินทร์ สมบูรณ์,080-123-4567,@phat_sb,สิรินี,อะคิตะ,5,เมีย,ยืนยัน,ยินยอม,ยินยอม,,sig_jjj000
2026-05-28 16:00:00,noppakao@example.com,นพเก้า เทพากร,,@nop_thep,จ้าวสมุทร,ชิบะอินุ,3,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_kkk111
2026-05-28 16:45:00,rattanaporn@example.com,รัตนาภรณ์ ดิษยะ,091-234-5678,@rat_di,สุดายา,คอร์กี้,2,เมีย,ยืนยัน,ยินยอม,ยินยอม,,sig_lll222
2026-05-28 17:30:00,thanawat@example.com,ธนวัฒน์ ประภาส,092-345-6789,@than_p,ยุทธการ,เกรทเดน,7,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_mmm333
2026-05-28 18:15:00,supaporn@example.com,สุภาพร เจริญสุข,093-456-7890,@supa_j,นภาลดา,เซนต์เบอร์นาร์ด,4,เมีย,ยืนยัน,ยินยอม,ยินยอม,,sig_nnn444
2026-05-28 19:00:00,kritsana@example.com,กฤษณะ วิจิตร,094-567-8901,@krit_wij,ไกรสร,บีเกิ้ล,1,ผู้,ยืนยัน,ยินยอม,ยินยอม,,sig_ooo555`;

/**
 * Returns the mock CSV string for testing sheet parsing, dedup, and rendering.
 */
export function loadMockSheetData(): string {
  return MOCK_SHEET_CSV;
}
