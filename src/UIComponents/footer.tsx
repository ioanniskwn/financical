"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  menu: ["Features", "Enterprise", "Security"],
  menu1: ["API", "Live events", "Pricing"],
  menu2: ["About", "Join Us", "Contact"],
};

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-white px-4 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Menu Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col space-y-3">
            <h3 className="font-medium text-sm tracking-wider">
              {title.toUpperCase()}
            </h3>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        ))}

        {/* Newsletter */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm">Subscribe to our newsletter</h3>
          <p className="text-gray-400 text-sm">
            Get a daily digest of the latest news and tips.
          </p>
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 md:col-span-4 pt-8">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
