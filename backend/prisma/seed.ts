import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu seed data...');

  // 1. Tạo admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dental.com' },
    update: {},
    create: {
      email: 'admin@dental.com',
      password: hashedPassword,
      fullName: 'Admin Phòng Khám',
      role: 'admin',
    },
  });
  console.log('✅ Tạo admin:', admin.email);

  // 2. Tạo bác sĩ
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        fullName: 'BS. Nguyễn Văn An',
        specialty: 'Niềng răng & Chỉnh nha',
        experience: 10,
        avatar: 'https://i.pravatar.cc/150?img=12',
        description: 'Chuyên gia niềng răng với hơn 10 năm kinh nghiệm. Tốt nghiệp Đại học Y Hà Nội.',
        rating: 4.9,
        workSchedule: {
          mon: ['09:00-12:00', '14:00-17:00'],
          tue: ['09:00-12:00', '14:00-17:00'],
          wed: ['09:00-12:00', '14:00-17:00'],
          thu: ['09:00-12:00', '14:00-17:00'],
          fri: ['09:00-12:00', '14:00-17:00'],
          sat: ['09:00-12:00'],
        },
      },
    }),
    prisma.doctor.create({
      data: {
        fullName: 'BS. Trần Thị Bình',
        specialty: 'Implant & Phục hồi răng',
        experience: 8,
        avatar: 'https://i.pravatar.cc/150?img=47',
        description: 'Chuyên sâu về cấy ghép Implant và phục hồi răng thẩm mỹ.',
        rating: 4.8,
        workSchedule: {
          mon: ['09:00-12:00', '14:00-17:00'],
          tue: ['09:00-12:00', '14:00-17:00'],
          wed: ['09:00-12:00', '14:00-17:00'],
          thu: ['09:00-12:00', '14:00-17:00'],
          fri: ['09:00-12:00', '14:00-17:00'],
        },
      },
    }),
    prisma.doctor.create({
      data: {
        fullName: 'BS. Lê Minh Châu',
        specialty: 'Nha khoa tổng quát',
        experience: 5,
        avatar: 'https://i.pravatar.cc/150?img=32',
        description: 'Bác sĩ trẻ, nhiệt tình, chuyên điều trị nha khoa tổng quát.',
        rating: 4.7,
        workSchedule: {
          mon: ['09:00-12:00', '14:00-17:00'],
          wed: ['09:00-12:00', '14:00-17:00'],
          fri: ['09:00-12:00', '14:00-17:00'],
          sat: ['09:00-12:00'],
        },
      },
    }),
  ]);
  console.log('✅ Tạo', doctors.length, 'bác sĩ');

  // 3. Tạo dịch vụ
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Khám tổng quát',
        description: 'Khám và tư vấn tình trạng răng miệng tổng quát',
        price: 100000,
        duration: 30,
        icon: '🦷',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Tẩy trắng răng',
        description: 'Tẩy trắng răng công nghệ Laser hiện đại, an toàn',
        price: 2000000,
        duration: 60,
        icon: '✨',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Niềng răng',
        description: 'Niềng răng mắc cài kim loại hoặc trong suốt',
        price: 30000000,
        duration: 45,
        icon: '😁',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Cấy ghép Implant',
        description: 'Cấy ghép răng Implant công nghệ Hàn Quốc, Mỹ',
        price: 15000000,
        duration: 90,
        icon: '🦴',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Nhổ răng khôn',
        description: 'Nhổ răng khôn an toàn, không đau',
        price: 1500000,
        duration: 45,
        icon: '🪥',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Bọc răng sứ',
        description: 'Bọc răng sứ thẩm mỹ, độ bền cao',
        price: 3000000,
        duration: 60,
        icon: '👑',
      },
    }),
  ]);
  console.log('✅ Tạo', services.length, 'dịch vụ');

  // 4. Tạo time slots (9:00 - 17:00, mỗi 30 phút)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];
  
  for (let i = 0; i < timeSlots.length; i++) {
    await prisma.timeSlot.upsert({
      where: { time: timeSlots[i] },
      update: {},
      create: {
        time: timeSlots[i],
        sortOrder: i,
      },
    });
  }
  console.log('✅ Tạo', timeSlots.length, 'khung giờ');

  // 5. Tạo một số lịch hẹn mẫu
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  await prisma.appointment.createMany({
    data: [
      {
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        customerEmail: 'nguyenvana@email.com',
        appointmentDate: tomorrow,
        appointmentTime: '09:00',
        serviceId: services[0].id,
        doctorId: doctors[0].id,
        status: 'confirmed',
        notes: 'Đau răng hàm dưới bên phải',
      },
      {
        customerName: 'Trần Thị B',
        customerPhone: '0912345678',
        appointmentDate: tomorrow,
        appointmentTime: '10:00',
        serviceId: services[1].id,
        doctorId: doctors[1].id,
        status: 'pending',
      },
    ],
  });
  console.log('✅ Tạo lịch hẹn mẫu');

  console.log('🎉 Seed data hoàn tất!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
