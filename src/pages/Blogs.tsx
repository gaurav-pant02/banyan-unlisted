import { useEffect, useState } from "react";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  title: string;
  date: string;
  content: string;
}

const sidebarBlogs = [
  {
    name: "PE/VC Deals Updater",
    url: "https://pevcdealsupdater.blogspot.com/",
    desc: "Latest PE & VC deals, M&A updates",
  },
  {
    name: "Unlisted Market Insights",
    url: "#",
    desc: "Industry analysis and research",
  },
  {
    name: "IPO & Capital Markets",
    url: "#",
    desc: "IPO news and capital market updates",
  },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("pevc_blogs");

    if (cached) {
      setBlogs(JSON.parse(cached));
    }

    fetch("/blogger")
      .then((res) => res.json())
      .then((data) => {
        const posts = data.feed.entry.slice(0, 5).map((item: any) => {
          let cleanContent = item.content.$t;

          // Remove ALL images
          cleanContent = cleanContent.replace(/<img[^>]*>/gi, "");

          // Remove ALL anchor tags (removes red SGB buttons + links)
          cleanContent = cleanContent.replace(
            /<a[^>]*>(.*?)<\/a>/gi,
            ""
          );

          // Remove empty paragraphs
          cleanContent = cleanContent.replace(
            /<p>\s*<\/p>/gi,
            ""
          );

          return {
            title: item.title.$t,
            date: new Date(item.published.$t).toDateString(),
            content: cleanContent,
          };
        });

        setBlogs(posts);
        sessionStorage.setItem("pevc_blogs", JSON.stringify(posts));
      })
      .catch((err) => console.error("Blog fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Market <span className="text-gradient-primary">Insights</span>
          </h1>
          <p className="text-muted-foreground">
            Latest PE/VC & Unlisted Market Updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - BLOGS */}
          <div className="lg:col-span-2 space-y-6">
            {blogs.map((blog, index) => {
              const plainText = blog.content.replace(/<[^>]+>/g, "");
              const preview =
                plainText.length > 220
                  ? plainText.slice(0, 220) + "..."
                  : plainText;

              return (
                <div
                  key={blog.title}
                  className="glass-hover rounded-xl p-6 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </div>

                  <h3 className="font-heading font-semibold text-lg mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  {expandedIndex === index ? (
                    <div
                      className="prose max-w-none text-sm text-muted-foreground mt-3"
                      dangerouslySetInnerHTML={{
                        __html: blog.content,
                      }}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {preview}
                    </p>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-primary text-xs gap-1 p-0 h-auto hover:bg-transparent"
                    onClick={() =>
                      setExpandedIndex(
                        expandedIndex === index ? null : index
                      )
                    }
                  >
                    {expandedIndex === index
                      ? "Show Less"
                      : "Read More"}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - SIDEBAR */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">
                External Blogs
              </h3>

              <div className="space-y-3">
                {sidebarBlogs.map((b) => (
                  <a
                    key={b.name}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {b.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {b.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;