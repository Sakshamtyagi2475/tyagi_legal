-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to blogs" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access to faqs" ON faqs
  FOR SELECT USING (true);

-- Create policies for admin access (you'll need to set up authentication)
-- For now, we'll allow all operations for authenticated users
-- You should replace this with proper admin role checking
CREATE POLICY "Allow authenticated users to manage blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage faqs" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO blogs (title, slug, content, excerpt, published) VALUES
('Understanding Wills and Trusts', 'understanding-wills-and-trusts', 
'<h1>Understanding Wills and Trusts</h1><p>When it comes to estate planning, understanding the difference between wills and trusts is crucial...</p>', 
'Learn the essential differences between wills and trusts for proper estate planning.', true),
('Navigating Small Business Contracts', 'navigating-small-business-contracts',
'<h1>Navigating Small Business Contracts</h1><p>Small business owners often find themselves overwhelmed by legal contracts...</p>',
'Essential guidance for small business owners dealing with legal contracts.', true),
('Divorce Mediation Guide', 'divorce-mediation-guide',
'<h1>Divorce Mediation Guide</h1><p>Divorce mediation offers a less adversarial approach to ending a marriage...</p>',
'Learn how divorce mediation can provide a more amicable solution to marital dissolution.', true);

INSERT INTO faqs (question, answer, "order") VALUES
('Do you offer a free initial consultation?', 'Yes—your first consultation is free so we can understand your situation and outline next steps.', 1),
('How do fees work?', 'We provide transparent pricing—fixed-fee where possible, otherwise clear hourly rates with regular updates.', 2),
('What should I bring to my first meeting?', 'Any relevant documents (contracts, IDs, notices, prior correspondence) and a short summary of your goals.', 3),
('How long does a typical case take?', 'Case duration varies depending on complexity. We provide realistic timelines during your initial consultation.', 4),
('Do you handle cases outside of [Your City]?', 'We primarily serve clients in [Your City] and surrounding areas, but can discuss remote consultations for certain matters.', 5);
