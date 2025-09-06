import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Users, Calendar, MessageSquare, BarChart3, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AuthForm } from "@/components/forms/AuthForm";
import { getSession } from "@/utils/session";
const { user } = getSession();
const features = [
	{
		icon: CheckCircle,
		title: "Smart Task Management",
		description:
			"Organize and track tasks with intelligent prioritization and deadline management.",
	},
	{
		icon: Users,
		title: "Team Collaboration",
		description:
			"Seamless communication and collaboration tools for distributed teams.",
	},
	{
		icon: Calendar,
		title: "Project Timeline",
		description:
			"Visual project timelines with milestone tracking and progress monitoring.",
	},
	{
		icon: MessageSquare,
		title: "Real-time Communication",
		description:
			"Instant messaging and threaded discussions within project contexts.",
	},
	{
		icon: BarChart3,
		title: "Analytics & Insights",
		description:
			"Comprehensive analytics to track team performance and project health.",
	},
	{
		icon: Shield,
		title: "Secure & Reliable",
		description:
			"Enterprise-grade security with reliable data protection and backup.",
	},
];

export function Landing() {
	const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
	const [isAuthOpen, setIsAuthOpen] = useState(false);
	const navigate = useNavigate();

	const handleAuthSuccess = () => {
		setIsAuthOpen(false);
		window.location.href = "/dashboard";
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">SS</span>
							</div>
							<span className="text-xl font-bold text-foreground">
								SynergySphere
							</span>
						</div>

						<div className="flex items-center gap-2">
							{user ? (
								<>
									<Button
										variant="outline"
										onClick={() => navigate("/dashboard")}
										className="mr-2"
									>
										Dashboard
									</Button>
									<div className="flex items-center gap-2">
										<div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
											{user.name?.[0] || "U"}
										</div>
										<span className="font-semibold">{user.name}</span>
									</div>
								</>
							) : (
								<>
									<Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
										<DialogTrigger asChild>
											<Button
												variant="ghost"
												onClick={() => {
													setAuthMode("signin");
													setIsAuthOpen(true);
												}}
											>
												Sign In
											</Button>
										</DialogTrigger>
										<DialogTrigger asChild>
											<Button
												onClick={() => {
													setAuthMode("signup");
													setIsAuthOpen(true);
												}}
											>
												Sign Up
											</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-md">
											<AuthForm
												mode={authMode}
												onSuccess={handleAuthSuccess}
												onModeChange={setAuthMode}
											/>
										</DialogContent>
									</Dialog>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative py-20 lg:py-32">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
							Your Team's{" "}
							<span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
								{" "}
								Central Nervous System
							</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
							SynergySphere goes beyond traditional project management. We help
							teams stay organized, communicate better, and work smarter with
							intelligent collaboration tools.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="text-lg px-8"
								onClick={() => {
									setAuthMode("signup");
									setIsAuthOpen(true);
								}}
							>
								Get Started Free
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="text-lg px-8"
							>
								View Demo
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
							Everything Your Team Needs
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							From task management to team communication, SynergySphere provides
							all the tools you need for seamless collaboration.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature) => (
							<Card
								key={feature.title}
								className="border border-border hover:shadow-lg transition-all duration-300"
							>
								<CardContent className="p-6">
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
										<feature.icon className="w-6 h-6 text-primary" />
									</div>
									<h3 className="text-xl font-semibold text-foreground mb-2">
										{feature.title}
									</h3>
									<p className="text-muted-foreground">
										{feature.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
								Why Teams Choose SynergySphere
							</h2>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<Zap className="w-6 h-6 text-primary mt-1" />
									<div>
										<h3 className="font-semibold text-foreground mb-1">
											Proactive Intelligence
										</h3>
										<p className="text-muted-foreground">
											Catch potential issues early with smart notifications and
											insights.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Globe className="w-6 h-6 text-primary mt-1" />
									<div>
										<h3 className="font-semibold text-foreground mb-1">
											Mobile & Desktop Ready
										</h3>
										<p className="text-muted-foreground">
											Access your work from anywhere with our responsive design.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Users className="w-6 h-6 text-primary mt-1" />
									<div>
										<h3 className="font-semibold text-foreground mb-1">
											Built for Teams
										</h3>
										<p className="text-muted-foreground">
											Designed specifically for modern team collaboration
											workflows.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-2xl p-8 text-center">
							<div className="text-4xl font-bold text-primary mb-2">50%</div>
							<div className="text-lg text-muted-foreground mb-4">
								Faster project delivery
							</div>
							<div className="text-4xl font-bold text-primary mb-2">90%</div>
							<div className="text-lg text-muted-foreground mb-4">
								Improved team communication
							</div>
							<div className="text-4xl font-bold text-primary mb-2">100%</div>
							<div className="text-lg text-muted-foreground">
								Team satisfaction
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-primary to-primary-light">
				<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
						Ready to Transform Your Team's Collaboration?
					</h2>
					<p className="text-xl text-white/90 mb-8">
						Join thousands of teams already using SynergySphere to work smarter,
						not harder.
					</p>
					<Button
						size="lg"
						variant="secondary"
						className="text-lg px-8"
						onClick={() => {
							setAuthMode("signup");
							setIsAuthOpen(true);
						}}
					>
						Start Your Free Trial
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border bg-muted/30 py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center gap-2 mb-4 md:mb-0">
							<div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">SS</span>
							</div>
							<span className="text-xl font-bold text-foreground">
								SynergySphere
							</span>
						</div>
						<div className="text-sm text-muted-foreground">
							© 2024 SynergySphere. All rights reserved.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}