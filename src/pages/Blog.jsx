import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      category: "Mental Wellbeing",
      title: "How Companionship Improves Cognitive Health in Older Adults",
      excerpt: "Recent studies show that regular social interaction can significantly delay cognitive decline and improve overall mental wellbeing.",
      date: "Oct 15, 2023",
      image: "linear-gradient(135deg, var(--secondary-color), #A8C3A6)"
    },
    {
      category: "Healthy Ageing",
      title: "5 Simple Ways to Stay Active During Winter",
      excerpt: "When the days get shorter, it's easy to stay indoors. Here are some gentle ways to keep moving and stay healthy this winter.",
      date: "Nov 02, 2023",
      image: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))"
    },
    {
      category: "Stories",
      title: "Margaret & Sarah: A Match Made Over Gardening",
      excerpt: "Read the heartwarming story of how a shared love for roses turned into a beautiful, lasting friendship.",
      date: "Nov 20, 2023",
      image: "linear-gradient(135deg, var(--accent-color), #f3d778)"
    }
  ];

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>Resources & Blog</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Insights on healthy ageing, overcoming loneliness, and community wellbeing.
          </p>
        </div>

        <div className="grid-3">
          {posts.map((post, idx) => (
            <div key={idx} style={{ 
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '200px', background: post.image }}></div>
              <div style={{ padding: 'var(--space-md)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--secondary-color)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {post.category}
                </span>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{post.date}</span>
                  <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}>
                    Read <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
