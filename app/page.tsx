import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Target, ShieldCheck, ArrowRight } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-background via-emerald-950/5 to-background">
      {/* Top Navbar */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-semibold text-lg tracking-tight">Progress Garden</span>
            <Badge variant="outline" className="ml-2 border-emerald-600/30 text-emerald-600 dark:text-emerald-400">
              MVP Base
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/Venkitta/progress-garden"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="icon">
                <GithubIcon className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 flex flex-col items-center text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          The Anti-Streak Habit Engine
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
          Grow habits through{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            micro-effort
          </span>
          , not guilt.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          &ldquo;You don&apos;t have to finish a habit today; you just have to move it forward.&rdquo;
          No broken streaks, no arbitrary resets. Just pure incremental progress visualized on a 52-week contribution garden.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 gap-2">
              Start Cultivating <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://github.com/Venkitta/progress-garden" target="_blank">
            <Button size="lg" variant="outline" className="gap-2">
              <GithubIcon className="w-4 h-4" /> View Architecture
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                <Target className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">The 3-Habit Limit</CardTitle>
              <CardDescription>
                Radical focus. You cultivate at most 3 active habits at once to ensure deep, consistent execution.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">52-Week Heatmap</CardTitle>
              <CardDescription>
                7x52 contribution grid dynamically scaled to daily effort intensity levels without timezone drift.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Hardened PostgreSQL</CardTitle>
              <CardDescription>
                Multi-tenant isolation powered by Supabase Row Level Security and transactional database triggers.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <p>© 2026 Progress Garden. Built with Next.js, shadcn/ui & Supabase.</p>
          <div className="flex items-center gap-6">
            <Link href="https://github.com/Venkitta/progress-garden" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
