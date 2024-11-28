import GiftFinder from '@/components/gift-finder';
import { GiftHero } from '@/components/gift-hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <GiftHero />
      <div id="gift-generator" className="min-h-screen flex items-center justify-center">
        <GiftFinder />
      </div>
    </main>
  );
}