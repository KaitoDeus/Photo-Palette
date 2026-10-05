import { prisma } from "./prisma.js";

const INITIAL_BRANCHES = [
  // --- HÀ NỘI ---
  {
    id: 1,
    name: "Photo Palette - Hoàn Kiếm",
    area: "Hoàn Kiếm",
    city: "Hà Nội",
    address: "8 P. Nhà Chung, Hàng Trống",
    lat: 21.0285228,
    lng: 105.8495635,
  },
  {
    id: 2,
    name: "Photo Palette - Chợ Gạo",
    area: "Hoàn Kiếm",
    city: "Hà Nội",
    address: "4 P. Chợ Gạo, Hàng Buồm",
  },
  {
    id: 3,
    name: "Photo Palette - Tây Hồ",
    area: "Tây Hồ",
    city: "Hà Nội",
    address: "47 P. Nhật Chiêu, Nhật Tân",
    lat: 21.070452,
    lng: 105.813508,
  },
  {
    id: 4,
    name: "Photo Palette - Lotte Mall Tây Hồ",
    area: "Tây Hồ",
    city: "Hà Nội",
    address: "TTTM Lotte Mall West Lake, 272 Võ Chí Công, Phú Thượng",
  },
  {
    id: 5,
    name: "Photo Palette - Chùa Bộc",
    area: "Đống Đa",
    city: "Hà Nội",
    address: "27 P. Chùa Bộc, Trung Liệt",
    lat: 21.0066235,
    lng: 105.8300058,
  },
  {
    id: 6,
    name: "Photo Palette - Láng Hạ",
    area: "Đống Đa",
    city: "Hà Nội",
    address: "93 Đ. Nguyễn Chí Thanh, Láng Hạ",
    lat: 21.019439,
    lng: 105.8083103,
  },
  {
    id: 7,
    name: "Photo Palette - Chùa Láng",
    area: "Đống Đa",
    city: "Hà Nội",
    address: "82 P. Chùa Láng, Láng Thượng",
  },
  {
    id: 8,
    name: "Photo Palette - Dương Khuê",
    area: "Cầu Giấy",
    city: "Hà Nội",
    address: "6 P. Dương Khuê, Mai Dịch",
    lat: 21.0359641,
    lng: 105.7730868,
  },
  {
    id: 9,
    name: "Photo Palette - Phan Văn Trường",
    area: "Cầu Giấy",
    city: "Hà Nội",
    address: "131 P. Phan Văn Trường, Dịch Vọng Hậu",
    lat: 21.0411422,
    lng: 105.7861036,
  },
  {
    id: 10,
    name: "Photo Palette - The Loop Cầu Giấy",
    area: "Cầu Giấy",
    city: "Hà Nội",
    address: "TTTM The Loop (IPH), 241 Xuân Thủy, Dịch Vọng Hậu",
  },
  {
    id: 11,
    name: "Photo Palette - Vũ Trọng Phụng",
    area: "Thanh Xuân",
    city: "Hà Nội",
    address: "27 Đ. Vũ Trọng Phụng, Thanh Xuân Trung",
    lat: 20.9971797,
    lng: 105.8098542,
  },
  {
    id: 12,
    name: "Photo Palette - Royal City",
    area: "Thanh Xuân",
    city: "Hà Nội",
    address: "TTTM Vincom Mega Mall Royal City, 72A Nguyễn Trãi, Thượng Đình",
  },
  {
    id: 13,
    name: "Photo Palette - Văn Quán",
    area: "Hà Đông",
    city: "Hà Nội",
    address: "106 Nguyễn Khuyến, KĐT Văn Quán",
    lat: 20.9758777,
    lng: 105.7888554,
  },
  {
    id: 14,
    name: "Photo Palette - Long Biên",
    area: "Long Biên",
    city: "Hà Nội",
    address: "388 Đ. Nguyễn Văn Cừ, Bồ Đề",
    lat: 21.0458284,
    lng: 105.8765967,
  },
  {
    id: 15,
    name: "Photo Palette - Linh Đàm",
    area: "Hoàng Mai",
    city: "Hà Nội",
    address: "KĐT Tây Nam Linh Đàm, Hoàng Liệt",
  },
  {
    id: 16,
    name: "Photo Palette - Vincom Metropolis",
    area: "Ba Đình",
    city: "Hà Nội",
    address: "TTTM Vincom Center Metropolis, 29 Liễu Giai, Ngọc Khánh",
  },

  // --- TP. HỒ CHÍ MINH ---
  {
    id: 17,
    name: "Photo Palette - Quận 1",
    area: "Quận 1",
    city: "TP. Hồ Chí Minh",
    address: "10 Huỳnh Thúc Kháng, Bến Nghé",
    lat: 10.7732838,
    lng: 106.7028019,
  },
  {
    id: 18,
    name: "Photo Palette - Bình Thạnh",
    area: "Bình Thạnh",
    city: "TP. Hồ Chí Minh",
    address: "16-18 Nguyễn Gia Trí, Phường 25",
    lat: 10.801863,
    lng: 106.7156007,
  },
  {
    id: 19,
    name: "Photo Palette - Quận 10",
    area: "Quận 10",
    city: "TP. Hồ Chí Minh",
    address: "501 Sư Vạn Hạnh, Phường 12",
    lat: 10.7740353,
    lng: 106.6681862,
  },
  {
    id: 20,
    name: "Photo Palette - Thủ Đức",
    area: "TP. Thủ Đức",
    city: "TP. Hồ Chí Minh",
    address: "73A Hoàng Diệu 2, Phường Linh Trung",
    lat: 10.857059,
    lng: 106.7645328,
  },
  {
    id: 21,
    name: "Photo Palette - Gigamall Thủ Đức",
    area: "TP. Thủ Đức",
    city: "TP. Hồ Chí Minh",
    address: "Tầng 4 TTTM Gigamall, 240-242 Phạm Văn Đồng, Hiệp Bình Chánh",
  },
  {
    id: 22,
    name: "Photo Palette - Thiso Mall Sala",
    area: "TP. Thủ Đức",
    city: "TP. Hồ Chí Minh",
    address: "Tầng 3 Thiso Mall Sala, 10 Mai Chí Thọ, Thủ Thiêm",
  },
  {
    id: 23,
    name: "Photo Palette - Gò Vấp",
    area: "Gò Vấp",
    city: "TP. Hồ Chí Minh",
    address: "513 Đ. Phan Văn Trị, Phường 5",
    lat: 10.824274,
    lng: 106.6912639,
  },
  {
    id: 24,
    name: "Photo Palette - Tân Phú",
    area: "Tân Phú",
    city: "TP. Hồ Chí Minh",
    address: "166 Lê Trọng Tấn, Tây Thạnh",
    lat: 10.8063162,
    lng: 106.6278659,
  },
  {
    id: 25,
    name: "Photo Palette - Quận 7",
    area: "Quận 7",
    city: "TP. Hồ Chí Minh",
    address: "547 Đ. Nguyễn Thị Thập, Tân Phong",
    lat: 10.739411,
    lng: 106.7058806,
  },
  {
    id: 26,
    name: "Photo Palette - SC VivoCity",
    area: "Quận 7",
    city: "TP. Hồ Chí Minh",
    address: "Tầng 3 SC VivoCity, 1058 Nguyễn Văn Linh, Tân Phong",
  },
  {
    id: 27,
    name: "Photo Palette - Nowzone",
    area: "Quận 5",
    city: "TP. Hồ Chí Minh",
    address: "Tầng 4 TTTM Nowzone, 235 Nguyễn Văn Cừ, Phường 4",
  },
  {
    id: 28,
    name: "Photo Palette - AEON Mall Bình Tân",
    area: "Bình Tân",
    city: "TP. Hồ Chí Minh",
    address: "Tầng 1 AEON Mall Bình Tân, 1 Đường số 17A, Bình Trị Đông B",
  },
  {
    id: 29,
    name: "Photo Palette - Quận 12",
    area: "Quận 12",
    city: "TP. Hồ Chí Minh",
    address: "2C/A Nguyễn Ảnh Thủ, Phường Hiệp Thành",
  },

  // --- CÁC TỈNH THÀNH KHÁC ---
  {
    id: 30,
    name: "Photo Palette - K-Town",
    area: "Văn Giang",
    city: "Hưng Yên",
    address: "Ocean Park 2, P2.3.KT27, Phố Đông 3, K-Town",
    lat: 20.9521112,
    lng: 105.9771198,
  },
  {
    id: 31,
    name: "Photo Palette - Vinh",
    area: "TP. Vinh",
    city: "Nghệ An",
    address: "27 Nguyễn Văn Cừ, Hưng Bình",
    lat: 18.6732624,
    lng: 105.6884462,
  },
  {
    id: 32,
    name: "Photo Palette - Thủ Dầu Một",
    area: "TP. Thủ Dầu Một",
    city: "Bình Dương",
    address: "267 Đ. Phú Lợi, Phường Phú Lợi",
    lat: 10.9828093,
    lng: 106.6753625,
  },
  {
    id: 33,
    name: "Photo Palette - Làng Đại Học",
    area: "TP. Dĩ An",
    city: "Bình Dương",
    address: "189 Đ. Lương Định Của, Đông Hòa",
  },
  {
    id: 34,
    name: "Photo Palette - Hải Phòng",
    area: "Lê Chân",
    city: "Hải Phòng",
    address: "8 P. Cầu Đất, Cầu Đất",
  },
  {
    id: 35,
    name: "Photo Palette - Biên Hòa",
    area: "TP. Biên Hòa",
    city: "Đồng Nai",
    address: "208 Đ. Phan Trung, KP2, Tân Mai",
  },
];

const INITIAL_BOOKINGS = [
  {
    code: "BK-2610-001",
    customerName: "Nguyễn Thùy Linh",
    customerPhone: "0912345678",
    customerEmail: "thuylinh@gmail.com",
    branchId: 1,
    branchName: "Photo Palette - Hoàn Kiếm",
    packageType: "LARGE_100K",
    bookingDate: "2026-10-04",
    timeSlot: "14:00 - 15:00",
    status: "CONFIRMED",
    totalAmount: 100000,
    notes: "Chụp ảnh kỷ niệm tốt nghiệp nhóm 4 người",
  },
  {
    code: "BK-2610-002",
    customerName: "Trần Minh Anh",
    customerPhone: "0987654321",
    customerEmail: "minhanh.t@gmail.com",
    branchId: 17,
    branchName: "Photo Palette - Quận 1",
    packageType: "SMALL_70K",
    bookingDate: "2026-10-04",
    timeSlot: "15:30 - 16:30",
    status: "PENDING",
    totalAmount: 70000,
    notes: "Chụp đôi phong cách Hàn Quốc",
  },
  {
    code: "BK-2610-003",
    customerName: "Lê Hoàng Yến",
    customerPhone: "0905123987",
    customerEmail: "yenle.design@gmail.com",
    branchId: 18,
    branchName: "Photo Palette - Bình Thạnh",
    packageType: "LARGE_100K",
    bookingDate: "2026-10-03",
    timeSlot: "17:00 - 18:00",
    status: "COMPLETED",
    totalAmount: 100000,
    notes: "Đã chụp xong, in thêm 2 dải ảnh",
  },
  {
    code: "BK-2610-004",
    customerName: "Vũ Hải Đăng",
    customerPhone: "0934888999",
    customerEmail: "haidang.vu@outlook.com",
    branchId: 5,
    branchName: "Photo Palette - Chùa Bộc",
    packageType: "SMALL_70K",
    bookingDate: "2026-10-05",
    timeSlot: "10:00 - 11:00",
    status: "CONFIRMED",
    totalAmount: 70000,
    notes: "Chụp cá nhân profile",
  },
  {
    code: "BK-2610-005",
    customerName: "Phạm Phương Thảo",
    customerPhone: "0977112233",
    customerEmail: "thaophuong.p@gmail.com",
    branchId: 3,
    branchName: "Photo Palette - Tây Hồ",
    packageType: "LARGE_100K",
    bookingDate: "2026-10-05",
    timeSlot: "16:00 - 17:00",
    status: "PENDING",
    totalAmount: 100000,
    notes: "Chụp concept hoàng hôn hồ Tây",
  },
];

const INITIAL_FRAMES = [
  {
    "id": "love-certificate",
    "name": "Love Certificate",
    "layout": "1x4",
    "category": "VALENTINE",
    "color": "bg-pink-50",
    "borderColor": "border-pink-400",
    "textColor": "text-pink-500"
  },
  {
    "id": "love-certificate-grid",
    "name": "Love Certificate",
    "layout": "2x2",
    "category": "VALENTINE",
    "color": "bg-pink-50",
    "borderColor": "border-pink-400",
    "textColor": "text-pink-500"
  },
  {
    "id": "my-one-and-only",
    "name": "My One & Only",
    "layout": "1x4",
    "category": "VALENTINE",
    "color": "bg-blue-50",
    "borderColor": "border-blue-400",
    "textColor": "text-blue-600"
  },
  {
    "id": "my-one-and-only-grid",
    "name": "My One & Only",
    "layout": "2x2",
    "category": "VALENTINE",
    "color": "bg-blue-50",
    "borderColor": "border-blue-400",
    "textColor": "text-blue-600"
  },
  {
    "id": "hoaxuan",
    "name": "Hoa Xuân",
    "layout": "1x4",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "hoaxuan-grid",
    "name": "Hoa Xuân",
    "layout": "2x2",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "love-letter",
    "name": "Love Letter",
    "layout": "1x4",
    "category": "VALENTINE",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "love-letter-grid",
    "name": "Love Letter",
    "layout": "2x2",
    "category": "VALENTINE",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "lunar-new-year",
    "name": "Tết Nguyên Đán",
    "layout": "1x4",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "lunar-new-year-grid",
    "name": "Tết Nguyên Đán",
    "layout": "2x2",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "sac-xuan",
    "name": "Sắc Xuân",
    "layout": "1x4",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "sac-xuan-grid",
    "name": "Sắc Xuân",
    "layout": "2x2",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "tan-xuan",
    "name": "Tân Xuân",
    "layout": "1x4",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "tan-xuan-grid",
    "name": "Tân Xuân",
    "layout": "2x2",
    "category": "TET HOLIDAY",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "happy-birthday",
    "name": "Happy Birthday",
    "layout": "1x4",
    "category": "BIRTHDAY",
    "color": "bg-yellow-50",
    "borderColor": "border-yellow-400",
    "textColor": "text-yellow-600"
  },
  {
    "id": "happy-birthday-grid",
    "name": "Happy Birthday",
    "layout": "2x2",
    "category": "BIRTHDAY",
    "color": "bg-yellow-50",
    "borderColor": "border-yellow-400",
    "textColor": "text-yellow-600"
  },
  {
    "id": "just-a-girl-just-perfect",
    "name": "Just a Girl, Just Perfect",
    "layout": "1x4",
    "category": "8/3",
    "color": "bg-purple-50",
    "borderColor": "border-purple-400",
    "textColor": "text-purple-600"
  },
  {
    "id": "just-a-girl-just-perfect-grid",
    "name": "Just a Girl, Just Perfect",
    "layout": "2x2",
    "category": "8/3",
    "color": "bg-purple-50",
    "borderColor": "border-purple-400",
    "textColor": "text-purple-600"
  },
  {
    "id": "an-endless-immersion-into-beauty",
    "name": "An Endless Immersion into Beauty",
    "layout": "1x4",
    "category": "LOVE",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "an-endless-immersion-into-beauty-grid",
    "name": "An Endless Immersion into Beauty",
    "layout": "2x2",
    "category": "LOVE",
    "color": "bg-red-50",
    "borderColor": "border-red-400",
    "textColor": "text-red-500"
  },
  {
    "id": "hidden-in-starlight",
    "name": "Hidden in Starlight",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-400",
    "textColor": "text-slate-600"
  },
  {
    "id": "hidden-in-starlight-grid",
    "name": "Hidden in Starlight",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-400",
    "textColor": "text-slate-600"
  },
  {
    "id": "happy-always",
    "name": "Happy Always",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-400",
    "textColor": "text-slate-600"
  },
  {
    "id": "happy-always-grid",
    "name": "Happy Always",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-400",
    "textColor": "text-slate-600"
  },
  {
    "id": "layered-keepsake-1x4",
    "name": "Layered Keepsake",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "layered-keepsake-2x2",
    "name": "Layered Keepsake",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "basketball-tournament",
    "name": "Basketball Tournament",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "basketball-tournament-grid",
    "name": "Basketball Tournament",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "berry-pop",
    "name": "Berry Pop!",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "berry-pop-grid",
    "name": "Berry Pop!",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "dreamy-sugar-rush",
    "name": "Dreamy Sugar Rush",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "dreamy-sugar-rush-grid",
    "name": "Dreamy Sugar Rush",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "guest-check",
    "name": "Guest Check",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "guest-check-grid",
    "name": "Guest Check",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "lucky-clovee-manifest",
    "name": "Lucky Clovee Manifest",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "lucky-clovee-manifest-grid",
    "name": "Lucky Clovee Manifest",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "special-delivery",
    "name": "Special Delivery",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "special-delivery-grid",
    "name": "Special Delivery",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "pink-diary",
    "name": "PINK DIARY – A LITTLE WORLD OF SWEET MOMENTS",
    "layout": "1x4",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  },
  {
    "id": "pink-diary-grid",
    "name": "PINK DIARY – A LITTLE WORLD OF SWEET MOMENTS",
    "layout": "2x2",
    "category": "GENERAL",
    "color": "bg-slate-50",
    "borderColor": "border-slate-200",
    "textColor": "text-slate-600"
  }
];

export async function seedDatabase() {
  console.log("🌱 Starting Database Seed for Photo Palette...");

  // 1. Seed Branches
  for (const b of INITIAL_BRANCHES) {
    await prisma.branch.upsert({
      where: { id: b.id },
      update: {
        name: b.name,
        area: b.area,
        city: b.city,
        address: b.address,
        lat: b.lat ?? null,
        lng: b.lng ?? null,
      },
      create: {
        id: b.id,
        name: b.name,
        area: b.area,
        city: b.city,
        address: b.address,
        lat: b.lat ?? null,
        lng: b.lng ?? null,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_BRANCHES.length} studio branches.`);

  // 2. Seed Frames
  // Purge legacy/broken dummy frames if any
  await prisma.frame.deleteMany({
    where: {
      id: {
        in: [
          "starlight-glow",
          "starlight-glow-grid",
          "hoa-xuan",
          "hoa-xuan-grid",
        ],
      },
    },
  });
  for (const f of INITIAL_FRAMES) {
    await prisma.frame.upsert({
      where: { id: f.id },
      update: {
        name: f.name,
        layout: f.layout,
        category: f.category,
        color: f.color,
        borderColor: f.borderColor,
        textColor: f.textColor,
      },
      create: {
        id: f.id,
        name: f.name,
        layout: f.layout,
        category: f.category,
        color: f.color,
        borderColor: f.borderColor,
        textColor: f.textColor,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_FRAMES.length} photobooth frames.`);

  // 3. Seed Bookings
  for (const bk of INITIAL_BOOKINGS) {
    await prisma.booking.upsert({
      where: { code: bk.code },
      update: {
        customerName: bk.customerName,
        customerPhone: bk.customerPhone,
        customerEmail: bk.customerEmail,
        branchId: bk.branchId,
        branchName: bk.branchName,
        packageType: bk.packageType,
        bookingDate: bk.bookingDate,
        timeSlot: bk.timeSlot,
        status: bk.status,
        totalAmount: bk.totalAmount,
        notes: bk.notes,
      },
      create: {
        code: bk.code,
        customerName: bk.customerName,
        customerPhone: bk.customerPhone,
        customerEmail: bk.customerEmail,
        branchId: bk.branchId,
        branchName: bk.branchName,
        packageType: bk.packageType,
        bookingDate: bk.bookingDate,
        timeSlot: bk.timeSlot,
        status: bk.status,
        totalAmount: bk.totalAmount,
        notes: bk.notes,
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_BOOKINGS.length} sample bookings.`);

  // 4. Seed Default Admin User
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "admin123", // in production can be bcrypt hashed
      name: "Quản Trị Viên",
      role: "SUPER_ADMIN",
      avatar: "/logo.jpeg",
    },
  });
  console.log("✅ Seeded default admin account (admin / admin123).");

  console.log("🎉 Database seeding completed successfully!");
}

// Execute if run directly
if (process.argv[1] && process.argv[1].endsWith("seed.ts")) {
  seedDatabase()
    .then(async () => {
      await prisma.$disconnect();
      process.exit(0);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
