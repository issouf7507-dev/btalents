import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@btalents.com' },
    update: {},
    create: {
      email: 'admin@btalents.com',
      name: 'Admin',
      emailVerified: true,
      role: 'admin',
    },
  });

  // Create account for email/password authentication
  await prisma.account.upsert({
    where: { 
      id: `email-${admin.id}`,
    },
    update: {},
    create: {
      id: `email-${admin.id}`,
      accountId: admin.email,
      providerId: 'credential',
      userId: admin.id,
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create default categories
  const categories = [
    {
      name: 'Trends',
      slug: 'trends',
      description: 'Latest trends in web design and development',
    },
    {
      name: 'Design',
      slug: 'design',
      description: 'User experience and design articles',
    },
    {
      name: 'Development',
      slug: 'development',
      description: 'Web development tutorials and tips',
    },
    {
      name: 'Strategy',
      slug: 'strategy',
      description: 'Digital strategy and marketing',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    console.log(`✅ Category created: ${category.name}`);
  }

  // Get Trends category for sample posts
  const trendsCategory = await prisma.category.findUnique({
    where: { slug: 'trends' },
  });

  if (trendsCategory) {
    // Create sample blog posts
    const posts = [
      {
        title: 'From Concept to Clicks: How Strategy Fuels Great Web Design',
        description: 'Discover how a well-defined digital strategy transforms creative ideas into high-performing websites that engage users and drive traffic.',
        slug: 'from-concept-to-clicks-how-strategy-fuels-great-web-design',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        isFeatured: true,
        categoryId: trendsCategory.id,
        authorId: admin.id,
      },
      {
        title: 'User-Centered, Strategy-Driven: Designing for Impact in 2025',
        description: 'Unpack the latest trends in UX, SEO, and responsive design that are helping forward-thinking brands win.',
        slug: 'user-centered-strategy-driven-designing-for-impact-in-2025',
        isFeatured: false,
        categoryId: trendsCategory.id,
        authorId: admin.id,
      },
      {
        title: 'Collaboration that Converts: Why the Right Agency Partnership Matters',
        description: 'Learn why aligning with the right creative partner can make or break your online success story.',
        slug: 'collaboration-that-converts-why-the-right-agency-partnership-matters',
        isFeatured: false,
        categoryId: trendsCategory.id,
        authorId: admin.id,
      },
      {
        title: 'The Art of Digital Transformation: Turning Vision into Value',
        description: 'Explore real-world examples of businesses that reimagined their digital presence and achieved success.',
        slug: 'the-art-of-digital-transformation-turning-vision-into-value',
        isFeatured: false,
        categoryId: trendsCategory.id,
        authorId: admin.id,
      },
    ];

    for (const post of posts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      });
      console.log(`✅ Blog post created: ${post.title}`);
    }
  }

  console.log('🎉 Seed completed!');
  console.log('\n📝 Login credentials:');
  console.log('Email: admin@btalents.com');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
