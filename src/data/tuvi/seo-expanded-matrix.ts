/**
 * Expanded SEO Content for 14 main stars x 12 palaces
 */

export interface StarPalaceSEOContent {
  overview: string;
  fortune: string; // Vận may / Tác động tài lộc
  advice: string;  // Lời khuyên
  risk: string;    // Rủi ro / Lưu ý
}

export const STAR_PALACE_SEO_MATRIX: Record<string, Record<string, StarPalaceSEOContent>> = {
  'tu-vi': {
    'menh': {
      overview: 'Tử Vi tại Mệnh là cách cục "Cực Hướng Ly Minh" (nếu ở Ngọ) hoặc vương giả. Chủ về người có phong thái lãnh đạo, đĩnh đạc và uy tín.',
      fortune: 'Tài lộc dồi dào, thường nắm giữ các vị trí quản lý hoặc có sản nghiệp riêng vững chắc.',
      advice: 'Cần tránh sự kiêu ngạo, nên lắng nghe cấp dưới để giữ vững ngai vàng của mình.',
      risk: 'Dễ bị cô độc nếu không có các sao hỗ trợ (Tả Phù, Hữu Bật) vây quanh.'
    },
    'tai-bach': {
      overview: 'Tử Vi chủ về quyền uy, khi đóng ở Tài Bạch giúp chủ nhân có khả năng kiếm tiền từ quyền lực và địa vị.',
      fortune: 'Tiền bạc ổn định, thường đến từ các nguồn chính thống, kinh doanh quy mô lớn.',
      advice: 'Nên tập trung vào các lĩnh vực tài chính hoặc quản trị cao cấp.',
      risk: 'Chi tiêu đôi khi quá hào phóng để giữ thể diện.'
    },
    'quan-loc': {
      overview: 'Đây là vị trí đẹp nhất cho sao Tử Vi. Chủ về đường công danh rộng mở, dễ đạt đến đỉnh cao sự nghiệp.',
      fortune: 'Thăng tiến đều đặn, có tiếng tăm trong ngành nghề mình theo đuổi.',
      advice: 'Hãy kiên trì với mục tiêu dài hạn, tránh nhảy việc quá nhiều làm loãng uy tín.',
      risk: 'Áp lực trách nhiệm lớn có thể gây căng thẳng kéo dài.'
    }
  },
  'thai-duong': {
    'menh': {
      overview: 'Thái Dương (mặt trời) thủ mệnh chủ về sự hào phóng, trung thực và khao khát cống hiến.',
      fortune: 'Thường đạt được danh tiếng trước rồi mới đến tiền bạc. Phù hợp làm người của công chúng.',
      advice: 'Nên học cách kiềm chế cái tôi và bớt nóng nảy trong giao tiếp.',
      risk: 'Chú ý các bệnh về mắt, thần kinh do làm việc quá sức.'
    },
    'quan-loc': {
      overview: 'Công danh rực rỡ như mặt trời ban trưa. Chủ nhân thường làm việc trong các cơ quan nhà nước hoặc tổ chức lớn.',
      fortune: 'Quyền lực đi kèm với trách nhiệm. Dễ trở thành người dẫn dắt đám đông.',
      advice: 'Cần chú trọng xây dựng hình ảnh cá nhân và sự minh bạch trong công việc.',
      risk: 'Dễ bị thị phi, ghen ghét do quá nổi bật.'
    }
  },
  'vu-khuc': {
    'tai-bach': {
      overview: 'Vũ Khúc là tài tinh. Tại cung Tài Bạch, đây là cách cục "Tài nhập khổ khố", tiền bạc tích lũy như núi.',
      fortune: 'Khả năng quản lý tài chính xuất sắc, có duyên với đầu tư và tích sản.',
      advice: 'Nên tham gia vào các lĩnh vực ngân hàng, vàng bạc hoặc bất động sản.',
      risk: 'Tính cách thực dụng có thể làm khô khan các mối quan hệ xã hội.'
    }
  }
};

// Fallback logic to generate structured content from string summaries
export function getExpandedSEOContent(starName: string, palaceName: string, baseSummary: string): StarPalaceSEOContent {
  const starSlug = starName.toLowerCase().replace(/ /g, '-');
  const palaceSlug = palaceName.toLowerCase().replace(/ /g, '-');
  
  if (STAR_PALACE_SEO_MATRIX[starSlug]?.[palaceSlug]) {
    return STAR_PALACE_SEO_MATRIX[starSlug][palaceSlug];
  }

  // Generative fallback based on star nature
  const isGood = !['That Sat', 'Pha Quan', 'Liem Trinh', 'Cu Mon'].includes(starName);
  
  return {
    overview: baseSummary,
    fortune: isGood 
      ? `Mang lại sự ổn định và cơ hội phát triển về mặt tài chính trong lâu dài tại cung ${palaceName}.`
      : `Tài lộc có nhiều biến động, cần sự quyết đoán và thận trọng mới giữ được thành quả.`,
    advice: `Hãy tận dụng những tính chất tốt nhất của ${starName} để hóa giải các điểm yếu của cung ${palaceName}.`,
    risk: `Cần đề phòng các tác động từ hung tinh vây chiếu để tránh tổn thất không đáng có.`
  };
}
