import { useState, useEffect } from 'react';
import Header from '@/components/portal/Header';
import Footer from '@/components/portal/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy, Clock, Calendar, Search, TrendingUp, Flame, ChevronRight,
  ArrowRight, Star, Eye, BookmarkPlus, Share2, RefreshCw, Filter, Zap, ArrowLeft, User
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ── Article body content (keyed by English title) ──────────────────────────
type ArticlePreview = {
  titleEn: string; titleBn: string;
  descEn: string;  descBn: string;
  icon: string;    badge?: string; badgeColor?: string;
  timeEn: string;  timeBn: string; views?: string;
  author?: string;
};

const articleBodies: Record<string, { en: string[]; bn: string[] }> = {
  'Bangladesh Beat India in Historic T20 Series Win': {
    en: [
      "Bangladesh scripted history on Tuesday evening at the Sher-e-Bangla National Cricket Stadium, clinching the T20I series against India with a clinical 6-wicket victory in the decisive third match.",
      "Shakib Al Hasan led from the front with a masterful 54 off 38 balls. Taskin Ahmed grabbed 3 wickets and Mustafizur Rahman took 2 important scalps to restrict India to 152/8 in 20 overs.",
      "Litton Das provided the platform at the top with a breezy 42 off 32 balls, before a composed partnership between Shakib and Towhid Hridoy (32*) saw Bangladesh home with an over to spare. The crowd at Mirpur erupted in celebrations that lasted well into the night.",
      "Bangladesh Head Coach Chandika Hathurusingha described it as a 'watershed moment' for Bangladesh cricket. Captain Najmul Hossain Shanto dedicated the win to the fans who packed the stadium.",
      "The series win is Bangladesh's first T20I series victory over India in five attempts, moving them up to 5th in the ICC T20I rankings.",
    ],
    bn: [
      "মঙ্গলবার সন্ধ্যায় শেরে-বাংলা জাতীয় ক্রিকেট স্টেডিয়ামে বাংলাদেশ ইতিহাস রচনা করেছে। তৃতীয় ও নির্ণায়ক ম্যাচে ভারতকে ৬ উইকেটে হারিয়ে টি২০আই সিরিজ জিতে নিয়েছে টাইগাররা।",
      "শাকিব আল হাসান ৩৮ বলে ৫৪ রানের অনন্য ইনিংস খেলে দলকে জয়ের পথে নিয়ে যান। তাসকিন আহমেদ ৩ উইকেট ও মুস্তাফিজুর রহমান ২টি উইকেট নিয়ে ভারতকে ২০ ওভারে ১৫২/৮-এ আটকে দেন।",
      "লিটন দাস ৩২ বলে ৪২ রান করে শুরুটা ভালো করেন, এরপর শাকিব ও তৌহিদ হৃদয়ের (৩২*) অংশীদারিত্বে বাংলাদেশ ১ ওভার বাকি থাকতে জয়ের বন্দরে পৌঁছায়। মিরপুরের দর্শকরা সারারাত উদযাপনে মেতে ওঠেন।",
      "বাংলাদেশ হেড কোচ চন্দিকা হাতুরুসিংহা এটিকে বাংলাদেশ ক্রিকেটের 'ঐতিহাসিক মুহূর্ত' হিসেবে বর্ণনা করেছেন। অধিনায়ক নাজমুল হোসেন শান্ত জয়টি সমর্থকদের উৎসর্গ করেন।",
      "ভারতের বিপক্ষে পাঁচটি সিরিজ প্রচেষ্টার মধ্যে এটি বাংলাদেশের প্রথম টি২০আই সিরিজ জয়। তারা এখন আইসিসি র‌্যাঙ্কিংয়ে ৫ম স্থানে উঠে এসেছে।",
    ],
  },
  'Manchester City vs Arsenal: Title Race Goes to Final Day': {
    en: [
      "One of the most dramatic evenings in Premier League history unfolded at the Etihad Stadium on Wednesday, as Manchester City and Arsenal played out a breathless 2-2 draw that leaves the title race wide open heading into the final matchday.",
      "City took the lead through Erling Haaland's 14th-minute header, only for Bukayo Saka to equalise with a stunning 25-yard strike before half-time. Phil Foden restored City's lead on the hour mark, but Gabriel Martinelli's 88th-minute equaliser sent thousands of travelling Arsenal fans into raptures.",
      "Both managers were philosophical in their post-match interviews. Pep Guardiola said, 'We knew it would come down to this. We have to believe.' Mikel Arteta called it 'the most exciting season I have ever been involved in.'",
      "Heading into the final matchday, City lead Arsenal by just one point. City face relegation-threatened Everton at home, while Arsenal travel to Villa Park — both matches kicking off simultaneously at 4:00pm.",
      "Neutrals across the world are preparing for what promises to be the most gripping final day in Premier League history.",
    ],
    bn: [
      "প্রিমিয়ার লিগ ইতিহাসের অন্যতম নাটকীয় সন্ধ্যা এটিহাদ স্টেডিয়ামে উন্মোচিত হলো। ম্যানচেস্টার সিটি ও আর্সেনাল ২-২ সমতায় শেষ করে শিরোপা লড়াই শেষ দিনের জন্য ছেড়ে দিল।",
      "সিটি আর্লিং হল্যান্ডের ১৪ মিনিটের হেডারে এগিয়ে গেলে বুকায়ো সাকা হাফটাইমের আগেই দুর্দান্ত শটে সমতা ফেরান। ফিল ফোডেন সিটির জন্য আবার এগিয়ে গেলে গাব্রিয়েল মার্টিনেলি ৮৮ মিনিটে সমতা এনে আর্সেনাল সমর্থকদের উল্লাসে ভাসিয়ে দেন।",
      "দুই ম্যানেজারই শান্ত ছিলেন। পেপ গার্দিওলা বলেন, 'এটাই হওয়ার কথা ছিল। আমাদের বিশ্বাস রাখতে হবে।' মিকেল আর্তেতা বললেন, এটি তার কোচিং ক্যারিয়ারের সবচেয়ে রোমাঞ্চকর মৌসুম।",
      "শেষ ম্যাচডের আগে সিটি মাত্র ১ পয়েন্টে এগিয়ে। সিটি ঘরে এভারটনের মুখোমুখি, আর আর্সেনাল যাবে ভিলা পার্কে — দুটো ম্যাচ একসাথে শুরু হবে।",
      "সারা বিশ্বের ভক্তরা প্রিমিয়ার লিগ ইতিহাসের সবচেয়ে রোমহর্ষক শেষ দিনের জন্য অপেক্ষা করছেন।",
    ],
  },
  'India vs Pakistan World Cup Thriller Ends in Super Over': {
    en: [
      "In the match that stopped the world, India and Pakistan produced a cricket classic for the ages, with India winning a nerve-shredding Super Over at the ICC T20 World Cup to advance to the semi-finals.",
      "Pakistan posted 181/4, with Babar Azam scoring a magnificent 76. India's reply looked on track, but wickets in the final three overs left them needing 16 off the last over — Hardik Pandya hit two sixes but was out on the final ball to leave the scores level.",
      "The Super Over was the most intense cricket ever witnessed. Pakistan scored 14 off their over. India needed 15 — Rohit Sharma smashed 14 from the first five balls, and Virat Kohli hit the winning boundary off the last ball to send Indian fans across the globe into delirium.",
      "'I don't know how I'm still standing,' a breathless Rohit Sharma told the post-match presenter. Pakistan captain Babar Azam was gracious in defeat: 'We gave everything. India were just better in the Super Over.'",
      "The match was watched by an estimated 800 million people worldwide, making it the most-viewed live sporting event in history.",
    ],
    bn: [
      "যে ম্যাচ সারাবিশ্বকে থামিয়ে দিয়েছিল — ভারত ও পাকিস্তান আইসিসি টি২০ বিশ্বকাপে একটি অবিস্মরণীয় সুপার ওভারে ভারতের জয়ের মধ্য দিয়ে শেষ হয়।",
      "পাকিস্তান বাবর আজমের দুর্দান্ত ৭৬ রানে ১৮১/৪ করে। ভারতের রান তাড়া ঠিকঠাক চললেও শেষ তিন ওভারে উইকেট পড়ে — হার্দিক পান্ডিয়া শেষ বলে দুটো ছক্কা মারলেও রান সমান থাকে।",
      "সুপার ওভার ছিল ক্রিকেটের সবচেয়ে উত্তেজনাপূর্ণ মুহূর্ত। পাকিস্তান ১৪ রান করে। ভারতের দরকার ছিল ১৫ — রোহিত শর্মা প্রথম পাঁচ বলে ১৪ করেন, বিরাট কোহলি শেষ বলে চার মেরে ভারতকে জয় এনে দেন।",
      "'আমি জানি না কীভাবে এখনো দাঁড়িয়ে আছি,' শ্বাস ফেলতে ফেলতে বলেন রোহিত। পাকিস্তান অধিনায়ক বাবর বললেন, 'আমরা সবকিছু দিয়েছি, কিন্তু ভারত সুপার ওভারে ভালো ছিল।'",
      "ম্যাচটি আনুমানিক ৮০ কোটি দর্শক দেখেছেন, এটি ইতিহাসের সবচেয়ে বেশি দর্শক দেখা লাইভ খেলাধুলার ইভেন্ট।",
    ],
  },
  'Mustafizur Rahman named Player of the Series vs Sri Lanka': {
    en: [
      "Mustafizur Rahman capped off a remarkable series with another imposing spell in the final ODI, taking 4/32 to seal a 3-0 series whitewash for Bangladesh over Sri Lanka.",
      "The 'Fizz' was virtually unplayable throughout the series, deceiving batters with his trademark cutters and slower balls. His 12 wickets across three matches came at an extraordinary average of 11.8.",
      "Bangladesh captain Shanto said, 'Mustafizur was our X-factor. He changed games whenever we needed it.' Sri Lanka coach Chris Silverwood said his team had 'no answer' to the left-armer.",
      "The Man of the Series award reunites Mustafizur with his best form after a challenging 18 months with injury. Cricket fans hope this is the beginning of a vintage Mustafizur run ahead of the World Cup.",
    ],
    bn: [
      "মুস্তাফিজুর রহমান শেষ ওয়ানডেতে ৪/৩২ নিয়ে বাংলাদেশকে শ্রীলংকার বিপক্ষে ৩-০ সিরিজ ক্লিনসুইপ উপহার দিয়েছেন।",
      "'ফিজ' পুরো সিরিজে প্রায় খেলার অযোগ্য ছিলেন — তার কাটার ও স্লোয়ার বলে ব্যাটাররা বারবার বিভ্রান্ত হয়েছেন। তিন ম্যাচে ১২ উইকেট নিয়েছেন মাত্র ১১.৮ গড়ে।",
      "বাংলাদেশ অধিনায়ক শান্ত বলেন, 'মুস্তাফিজ আমাদের এক্স-ফ্যাক্টর। দরকারের সময়ে সে ম্যাচ বদলে দেয়।' শ্রীলংকা কোচ বলেন তার দলের কাছে এই বাঁহাতি পেসারের 'কোনো উত্তর' ছিল না।",
      "দুর্দান্ত এই ফর্মে ফিরে আসা মুস্তাফিজকে বিশ্বকাপের আগে সেরা ফর্মে দেখার আশায় আছেন ক্রিকেট ভক্তরা।",
    ],
  },
  'Mbappe scores hat-trick as Real Madrid rout Bayern 4-1': {
    en: [
      "Kylian Mbappe delivered a masterclass at the Bernabeu on Tuesday, scoring a hat-trick in just 24 first-half minutes as Real Madrid hammered Bayern Munich 4-1 in the Champions League semi-final first leg.",
      "Mbappe opened the scoring with a delicate chip over goalkeeper Manuel Neuer in the 8th minute. His second was a ferocious left-foot drive from outside the box, and his hat-trick goal — a clinical penalty — came after Virgil van Dijk brought him down.",
      "Vinicius Jr. added the fourth in the 67th minute with a solo run and finish that drew comparisons to Lionel Messi at his best. Bayern's consolation goal came through Harry Kane's header in stoppage time.",
      "Real Madrid manager Carlo Ancelotti called it 'one of the greatest performances I have ever seen from an individual.' Mbappe said it was 'the night I have been dreaming of since I was a child.'",
    ],
    bn: [
      "কিলিয়ান এমবাপ্পে মঙ্গলবার বার্নাবেউতে প্রথমার্ধে মাত্র ২৪ মিনিটে হ্যাটট্রিক করে রিয়াল মাদ্রিদকে বায়ার্নকে ৪-১-এ গুঁড়িয়ে দিতে সাহায্য করেন।",
      "এমবাপ্পে ৮ মিনিটে ম্যানুয়েল নয়ারের ওপর দিয়ে সূক্ষ্ম চিপ দিয়ে প্রথম গোল করেন। দ্বিতীয়টি ছিল বাক্সের বাইরে থেকে বাঁ পায়ে ভয়ঙ্কর শট। তৃতীয়টি পেনাল্টি থেকে।",
      "ভিনিসিয়াস জুনিয়র ৬৭ মিনিটে একক প্রচেষ্টায় চতুর্থ গোলটি করেন, যা মেসির সেরা সময়ের সাথে তুলনা করা হচ্ছে। বায়ার্নের সান্ত্বনার গোলটি এসেছে হ্যারি কেনের হেডার থেকে।",
      "রিয়াল কোচ কার্লো আনচেলোত্তি বলেন, 'এটি আমার দেখা একজন ব্যক্তির সেরা পারফরম্যান্সগুলোর একটি।' এমবাপ্পে বলেন, 'এই রাতের স্বপ্ন ছোটবেলা থেকে দেখে আসছিলাম।'",
    ],
  },
  'LeBron James breaks all-time playoff assists record': {
    en: [
      "LeBron James cemented his status as the greatest basketball player of all time on Friday night, surpassing Magic Johnson's all-time NBA playoff assists record during the Los Angeles Lakers' 112-98 victory over the Denver Nuggets.",
      "James, now 41, delivered the record-breaking 584th playoff assist in the third quarter with a no-look pass to Anthony Davis for a slam dunk. The Crypto.com Arena erupted as the achievement was announced on the big screen.",
      "Magic Johnson, who attended the game, was the first to embrace LeBron after the whistle. 'I wanted to be here for this,' Magic said. 'LeBron is the greatest player this game has ever seen. Full stop.'",
      "LeBron finished with 22 points, 11 rebounds and 12 assists — his 97th career playoff triple-double. 'Records come and go,' James said. 'What matters to me is winning championships for the fans of this city.'",
    ],
    bn: [
      "শুক্রবার রাতে লেব্রন জেমস ম্যাজিক জনসনের এনবিএ প্লে-অফ অ্যাসিস্টের সর্বকালীন রেকর্ড ভেঙে সর্বকালের সেরা বাস্কেটবল খেলোয়াড় হিসেবে নিজেকে আরও শক্তভাবে প্রতিষ্ঠিত করলেন।",
      "৪১ বছর বয়সি জেমস তৃতীয় কোয়ার্টারে অ্যান্থনি ডেভিসকে নো-লুক পাস দিয়ে রেকর্ড ৫৮৪তম প্লে-অফ অ্যাসিস্ট সম্পন্ন করেন। বড় স্ক্রিনে ঘোষণার সাথে সাথে ক্রিপ্টো.কম অ্যারেনা বিস্ফোরিত হয়ে ওঠে।",
      "ম্যাজিক জনসন, যিনি সেই ম্যাচে উপস্থিত ছিলেন, বাঁশি বাজার পরেই লেব্রনকে জড়িয়ে ধরেন। 'এই মুহূর্তের জন্যই এসেছিলাম,' বললেন ম্যাজিক।",
      "লেব্রন ২২ পয়েন্ট, ১১ রিবাউন্ড ও ১২ অ্যাসিস্ট করেন — তার ৯৭তম ক্যারিয়ার প্লে-অফ ট্রিপল-ডাবল।",
    ],
  },
  'BCB announces squad for upcoming Zimbabwe series': {
    en: [
      "The Bangladesh Cricket Board has announced a 15-man squad for the upcoming three-match ODI series against Zimbabwe, which begins on April 10 at the Sher-e-Bangla National Cricket Stadium.",
      "Najmul Hossain Shanto continues as captain, with Litton Das as his deputy. The squad sees the return of Shakib Al Hasan after his one-match suspension, and uncapped fast bowler Nahid Rana earns his maiden call-up.",
      "Chief selector Gazi Ashraf Hossain Lipu said, 'We want to use this series to try out some new combinations ahead of the ICC World Cup. It is an important opportunity for players to stake their claims.'",
      "Zimbabwe won the toss and chose to bat in the warm-up match, with Bangladesh's new pace attack expected to be the major talking point of the series. Bangladesh are overwhelming favourites given Zimbabwe's recent ODI form.",
    ],
    bn: [
      "বাংলাদেশ ক্রিকেট বোর্ড আগামী তিন ম্যাচের ওয়ানডে সিরিজ — যা ১০ এপ্রিল শেরে-বাংলা স্টেডিয়ামে শুরু — জন্য ১৫ সদস্যের দল ঘোষণা করেছে।",
      "নাজমুল হোসেন শান্ত অধিনায়ক হিসেবে আছেন, লিটন দাস ডেপুটি। এক ম্যাচের নিষেধাজ্ঞার পর শাকিব আল হাসান দলে ফিরেছেন। আনক্যাপড দ্রুতগতি বোলার নাহিদ রানা প্রথমবারের মতো দলে ডাক পেয়েছেন।",
      "প্রধান নির্বাচক গাজী আশরাফ হোসেন লিপু বলেন, 'বিশ্বকাপের আগে নতুন সংমিশ্রণ পরীক্ষা করার সুযোগ ব্যবহার করতে চাই।'",
      "সাম্প্রতিক ওয়ানডে ফর্মের বিচারে বাংলাদেশই প্রচণ্ড ফেভারিট।",
    ],
  },
  'Alcaraz defeats Djokovic in thrilling 5-set Wimbledon final': {
    en: [
      "Carlos Alcaraz defended his Wimbledon crown in extraordinary fashion on Sunday, defeating Novak Djokovic 7-6, 3-6, 6-4, 4-6, 6-3 in a match for the ages that lasted four hours and twenty-two minutes.",
      "The first set was decided by a tie-break won 11-9 by Alcaraz after five set points were saved. Djokovic levelled in the second and third sets went with serve before Alcaraz's athleticism and ball-striking proved decisive in the decider.",
      "The Centre Court crowd was treated to 27 aces, 161 winners and more than 70 rallies of 10+ shots. Both players were repeatedly given standing ovations mid-rally.",
      "'This is the greatest match I have played in my career,' Alcaraz said. 'Novak pushed me to places I've never been.' Djokovic, philosophical as ever, said, 'At 38, I am still competing with the best on grass. I'm proud of that.'",
      "Alcaraz, at 22, becomes the youngest player in the Open Era to win three Wimbledon titles.",
    ],
    bn: [
      "কার্লোস আলকারাজ রোববার উইম্বলডন চ্যাম্পিয়নশিপ ধরে রেখেছেন, নোভাক জকোভিচকে ৭-৬, ৩-৬, ৬-৪, ৪-৬, ৬-৩-এ হারিয়েছেন। ম্যাচটি চার ঘণ্টা ২২ মিনিট চলেছে।",
      "প্রথম সেটের টাইব্রেকে পাঁচটি সেট পয়েন্ট বাঁচিয়ে আলকারাজ ১১-৯-এ জেতেন। দ্বিতীয় সেটে জকোভিচ সমতা ফেরান। পরের সেটগুলো সার্ভারকে অনুসরণ করে, শেষ সেটে আলকারাজের অ্যাথলেটিসিজম জয়ী হয়।",
      "সেন্টার কোর্টে ২৭টি এস, ১৬১টি উইনার এবং ৭০টিরও বেশি ১০+ শট রালি উপভোগ করেছেন দর্শকরা।",
      "'এটি আমার ক্যারিয়ারের সেরা ম্যাচ,' বললেন আলকারাজ। জকোভিচ বললেন, '৩৮ বছরে গ্রাসে সেরাদের সাথে লড়াই করতে পারছি, এটাই আমার গর্ব।'",
      "২২ বছর বয়সি আলকারাজ তিনটি উইম্বলডন শিরোপা জেতা ওপেন এরায় সর্বকনিষ্ঠ খেলোয়াড় হলেন।",
    ],
  },
  'Bangladesh football team qualifies for SAFF Championship final': {
    en: [
      "Bangladesh's national football team made history on Wednesday, defeating Nepal 2-1 in the SAFF Championship semi-final in extra time to reach the final of the competition for the first time in 12 years.",
      "Substitute forward Rakib Hossain became the hero of the night, scoring the winning goal in the 108th minute with a left-foot volley from the edge of the box that left the Nepali keeper rooted to the spot.",
      "Bangladesh coach Javier Cabrera praised his team's resilience: 'The players showed enormous character tonight. We deserved to be in the final.' Captain Jamal Bhuiyan said the whole nation should be proud.",
      "Bangladesh will face India in Sunday's final in Dhaka, a dream scenario for the millions of football fans in the country. Tickets for the final sold out within three hours of going on sale.",
    ],
    bn: [
      "বাংলাদেশ জাতীয় ফুটবল দল বুধবার ইতিহাস রচনা করেছে। সাফ চ্যাম্পিয়নশিপ সেমিফাইনালে অতিরিক্ত সময়ে নেপালকে ২-১ গোলে হারিয়ে ১২ বছরে প্রথমবারের মতো ফাইনালে উঠেছে।",
      "বদলি ফরোয়ার্ড রাকিব হোসেন ১০৮ মিনিটে বাক্সের বাইরে থেকে বাঁ পায়ে ভলিতে বিজয়ী গোলটি করে ম্যাচের নায়ক হন।",
      "বাংলাদেশ কোচ জাভিয়ের কাব্রেরা বললেন, 'খেলোয়াড়রা আজ বিশাল চরিত্র দেখিয়েছে। আমরা ফাইনালে থাকার যোগ্য।' অধিনায়ক জামাল ভূঁইয়া বললেন গোটা জাতির গর্বিত হওয়া উচিত।",
      "বাংলাদেশ রোববার ঢাকায় ফাইনালে ভারতের মুখোমুখি হবে — দেশের ফুটবল ভক্তদের স্বপ্নের দৃশ্য। টিকেট বিক্রি শুরুর তিন ঘণ্টার মধ্যে শেষ।",
    ],
  },
  'Bangladeshi GM Enamul Hossain wins Asian Chess Championship': {
    en: [
      "Grandmaster Enamul Hossain made Bangladesh proud on Saturday, claiming the Asian Chess Championship title in Tashkent with a dominant final-round performance that left his opponents in awe.",
      "Enamul finished with 8.5 points out of 9, half a point clear of his nearest rival, Indian GM Vidit Gujrathi. His 8th-round win against the Chinese favourite was particularly brilliant, earning Best Game of the Tournament.",
      "Bangladesh Chess Federation President said this is the greatest individual sporting achievement by a Bangladeshi in recent memory. Prime Minister offered congratulations in a televised address.",
      "Enamul, 28, now moves to 2,695 Elo — the highest ever for a Bangladeshi chess player. He has set his sights on crossing the 2,700 mark and qualifying for the Candidates Tournament.",
    ],
    bn: [
      "গ্র্যান্ডমাস্টার এনামুল হোসেন শনিবার তাশখন্দে এশিয়ান দাবা চ্যাম্পিয়নশিপ জিতে বাংলাদেশকে গর্বিত করেছেন। ৯ রাউন্ডে ৮.৫ পয়েন্ট নিয়ে শীর্ষে থেকেছেন।",
      "নিকটতম প্রতিদ্বন্দ্বী ভারতীয় জিএম বিদিত গুজরাথির চেয়ে আধা পয়েন্ট এগিয়ে শেষ করেন। চীনের ফেভারিটকে হারানো তার ৮ম রাউন্ডের গেমটি টুর্নামেন্টের সেরা গেম বিবেচিত হয়।",
      "বাংলাদেশ দাবা ফেডারেশন সভাপতি বলেন, এটি সাম্প্রতিক স্মৃতিতে কোনো বাংলাদেশির সেরা ব্যক্তিগত ক্রীড়া অর্জন। প্রধানমন্ত্রী টেলিভিশনে অভিনন্দন জানিয়েছেন।",
      "২৮ বছর বয়সি এনামুলের ইলো এখন ২৬৯৫ — বাংলাদেশি দাবা খেলোয়াড়ের সর্বোচ্চ। তিনি ২৭০০ ছুঁয়ে ক্যান্ডিডেটস টুর্নামেন্টে যোগ দেওয়ার স্বপ্ন দেখছেন।",
    ],
  },
  'Bangladesh Kabaddi team wins gold at South Asian Games 2026': {
    en: [
      "Bangladesh's national kabaddi team brought the nation to its feet on Sunday, defeating arch-rivals India 42-38 in the final of the South Asian Games 2026 to claim the gold medal in front of a roaring home crowd.",
      "The match was a see-saw affair, with India leading 22-18 at half time. Bangladesh's captain Arif Hossain inspired a stunning second-half comeback, scoring 14 raid points himself including the decisive super raid in the 38th minute.",
      "This is Bangladesh's first gold medal in kabaddi at the South Asian Games in 16 years. Sports Minister said the achievement was proof that Bangladesh's investment in grassroots sports was paying dividends.",
      "The team was given a heroes' welcome at Hazrat Shahjalal International Airport, with thousands of fans lining the streets of Dhaka to celebrate.",
    ],
    bn: [
      "বাংলাদেশ জাতীয় কাবাডি দল রোববার দক্ষিণ এশিয়ান গেমস ২০২৬-এর ফাইনালে চিরপ্রতিদ্বন্দ্বী ভারতকে ৪২-৩৮ পয়েন্টে হারিয়ে স্বর্ণ জিতেছে।",
      "ম্যাচে প্রথমার্ধে ভারত ২২-১৮-তে এগিয়ে থাকলে দ্বিতীয়ার্ধে অধিনায়ক আরিফ হোসেনের নেতৃত্বে অবিশ্বাস্য ঘুরে দাঁড়ানো ঘটে। তিনি নিজে ১৪ রেইড পয়েন্ট করেন এবং ৩৮ মিনিটে সুপার রেইডে ম্যাচের গতিপথ নির্ধারণ করে দেন।",
      "১৬ বছরে দক্ষিণ এশিয়ান গেমসে এটি বাংলাদেশের কাবাডিতে প্রথম স্বর্ণ। ক্রীড়ামন্ত্রী বলেন, বিনিয়োগ ফলে দিচ্ছে।",
      "দলকে বিমানবন্দরে নায়কোচিত অভ্যর্থনা জানানো হয় এবং রাজধানীর হাজার হাজার মানুষ রাস্তায় নেমে উদযাপন করেন।",
    ],
  },
  "Tiger's Tour Schedule 2026 - Full Fixtures Revealed": {
    en: [
      "The Bangladesh Cricket Board (BCB) has released the full international cricket schedule for 2026, and it's a packed calendar that will see the Tigers play in all three formats across a range of opponents.",
      "The schedule begins with the already-confirmed home series against Zimbabwe in April, followed by an away tour to the West Indies in June for three Tests and five T20Is. In August, Australia visit Bangladesh for a historic Test series for the first time in 10 years.",
      "BCB CEO Nizam Uddin Chowdhury said the board worked hard to secure high-quality bilateral series. 'We want to give our players maximum exposure against top teams as we prepare for the ICC Events in 2027.'",
      "The year ends with Bangladesh hosting England for a limited-overs series in December, a massive occasion given the growing fanbase for cricket in Bangladesh.",
    ],
    bn: [
      "বাংলাদেশ ক্রিকেট বোর্ড (বিসিবি) ২০২৬ সালের সম্পূর্ণ আন্তর্জাতিক ক্রিকেট সূচি প্রকাশ করেছে। এটি একটি পরিপূর্ণ ক্যালেন্ডার যেখানে টাইগাররা সব ফরম্যাটে বিভিন্ন দলের বিপক্ষে খেলবে।",
      "এপ্রিলে ঘরে জিম্বাবুয়ের বিপক্ষে ইতিমধ্যে নিশ্চিত সিরিজ দিয়ে শুরু। জুনে ওয়েস্ট ইন্ডিজ সফরে ৩ টেস্ট ও ৫ টি২০আই। আগস্টে ১০ বছরে প্রথমবার অস্ট্রেলিয়া ঐতিহাসিক টেস্ট সিরিজের জন্য বাংলাদেশ সফর করবে।",
      "বিসিবি সিইও নিজাম উদ্দিন চৌধুরী বলেন, 'আইসিসি ইভেন্টের প্রস্তুতি হিসেবে আমরা সেরা দলগুলোর বিপক্ষে খেলার সুযোগ দিতে চাই।'",
      "বছর শেষ হবে ডিসেম্বরে বাংলাদেশে ইংল্যান্ডের লিমিটেড ওভারস সিরিজের মধ্য দিয়ে।",
    ],
  },
  'BD Football Federation Unveils 5-Year Development Plan': {
    en: [
      "The Bangladesh Football Federation (BFF) has announced an ambitious 5-year National Football Development Plan in partnership with FIFA, backed by a $15 million investment fund.",
      "The plan focuses on four pillars: grassroots school football programs across all 64 districts, a new national youth academy, a women's football development pathway, and upgrading 20 football stadiums to international standards.",
      "FIFA's Head of Development for Asia, visiting Dhaka for the announcement, called Bangladesh's plan 'one of the most comprehensive football development programs in South Asia.'",
      "BFF President Kazi Salahuddin said results should be visible within three years. 'We want to see Bangladesh in the AFC Asian Cup by 2030. This plan is the foundation.'",
    ],
    bn: [
      "বাংলাদেশ ফুটবল ফেডারেশন (বিএফএফ) ফিফার সাথে অংশীদারিত্বে ১৫ মিলিয়ন ডলার বিনিয়োগে একটি উচ্চাভিলাষী ৫ বছরের জাতীয় ফুটবল উন্নয়ন পরিকল্পনা ঘোষণা করেছে।",
      "পরিকল্পনার চারটি মূল স্তম্ভ: ৬৪ জেলায় স্কুল ফুটবল প্রোগ্রাম, নতুন যুব একাডেমি, নারী ফুটবল উন্নয়ন পথ এবং ২০টি স্টেডিয়াম আন্তর্জাতিক মানে উন্নীত।",
      "ফিফার এশিয়া উন্নয়ন প্রধান বলেন, বাংলাদেশের পরিকল্পনা 'দক্ষিণ এশিয়ার অন্যতম সেরা ফুটবল উন্নয়ন কর্মসূচি।'",
      "বিএফএফ সভাপতি কাজী সালাহউদ্দিন বলেন, 'আমরা ২০৩০ সালের মধ্যে এএফসি এশিয়ান কাপে বাংলাদেশকে দেখতে চাই।'",
    ],
  },
  'Bangladesh Wins Gold in Kabaddi at South Asian Games': {
    en: [
      "The Bangladesh national kabaddi team claimed the gold medal at the South Asian Games in Dhaka on Sunday, defeating India 42-38 in a fiercely contested final.",
      "The team's captain Arif Hossain was instrumental throughout the tournament, but it was his decisive super raid in the 38th minute of the final that turned the tide decisively in Bangladesh's favour.",
      "This triumph ends a 16-year drought for Bangladesh in kabaddi at the South Asian Games. The team dedicated the gold medal to their families and the fans who packed the stadium.",
    ],
    bn: [
      "বাংলাদেশ জাতীয় কাবাডি দল রোববার ঢাকায় অনুষ্ঠিত দক্ষিণ এশিয়ান গেমসের ফাইনালে ভারতকে ৪২-৩৮ পয়েন্টে হারিয়ে স্বর্ণ জিতেছে।",
      "অধিনায়ক আরিফ হোসেন পুরো টুর্নামেন্টে নির্ণায়ক ভূমিকা রাখেন। ফাইনালের ৩৮ মিনিটে তার সুপার রেইড দলের বিজয়ের পথ নিশ্চিত করে।",
      "এই জয়ে ১৬ বছরের খরা শেষ হলো। দল এই স্বর্ণ তাদের পরিবার ও সমর্থকদের উৎসর্গ করেছে।",
    ],
  },
  "GM Enamul Hossain - Bangladesh's Chess Pride": {
    en: [
      "Grandmaster Enamul Hossain has returned from Tashkent as Bangladesh's greatest ever chess player, winning the Asian Chess Championship and inspiring an entire generation of young chess enthusiasts in the country.",
      "Enamul's journey to the top has been a story of perseverance. Born in Comilla, he learned chess from his father at age 7 and achieved his IM title at 18 before facing years of financial struggles to fund his international career.",
      "The Bangladesh Chess Federation is now using Enamul's success to launch a national chess talent search program in schools. 'We believe there are hundreds of Enamuls waiting to be discovered,' the federation said.",
      "Eyes are now on the World Chess Championship, where Enamul hopes to become the first South Asian player other than Viswanathan Anand to make the candidates' final.",
    ],
    bn: [
      "গ্র্যান্ডমাস্টার এনামুল হোসেন তাশখন্দ থেকে বাংলাদেশের সর্বকালের সেরা দাবাড়ু হিসেবে ফিরেছেন, এশিয়ান দাবা চ্যাম্পিয়নশিপ জিতে দেশের লক্ষ তরুণ দাবা উৎসাহীকে অনুপ্রাণিত করেছেন।",
      "এনামুলের পথচলা ছিল অধ্যবসায়ের গল্প। কুমিল্লায় জন্ম নেওয়া এনামুল ৭ বছরে বাবার কাছে দাবা শেখেন, ১৮ বছরে আইএম খেতাব পান, তারপর আন্তর্জাতিক ক্যারিয়ারে অর্থের সংগ্রাম।",
      "বাংলাদেশ দাবা ফেডারেশন এনামুলের সাফল্যকে কেন্দ্র করে স্কুলে জাতীয় দাবা প্রতিভা অনুসন্ধান কর্মসূচি চালু করছে।",
      "এখন চোখ বিশ্ব দাবা চ্যাম্পিয়নশিপের দিকে, যেখানে এনামুল বিশ্বনাথন আনন্দের বাইরে প্রথম দক্ষিণ এশীয় হিসেবে ক্যান্ডিডেটস ফাইনালে যাওয়ার স্বপ্ন দেখছেন।",
    ],
  },
  'Man City vs Arsenal - Best Goals': {
    en: [
      "The 2-2 draw at the Etihad produced some of the best goals of the entire Premier League season. We break down each of the four goals and what they mean for the title race.",
      "Haaland's opener was all about timing and position — his header from Phil Foden's cross was textbook centre-forward play. Saka's equaliser, however, was a pure wonder goal: 25 yards, dipping late, Ederson beaten at his near post.",
      "Foden's second was a piece of individual brilliance — a step-over, a shimmy, a left-footed finish into the bottom corner. Martinelli's 88th-minute leveller was the most dramatic of all: a low driven finish from a tight angle with barely any back-lift.",
      "Fans and pundits are calling it the best 2-2 draw in Premier League history.",
    ],
    bn: [
      "ইতিহাদে ২-২ ড্রতে পুরো প্রিমিয়ার লিগ মৌসুমের কিছু সেরা গোল এসেছে। প্রতিটি গোল বিশ্লেষণ করা হলো।",
      "হল্যান্ডের গোলটি ছিল টাইমিং ও পজিশনিংয়ের মাস্টারক্লাস। সাকার সমতার গোল ছিল বিস্ময়কর — ২৫ গজ থেকে, ডিপিং লেট, এডার্সন কাছের পোস্টে ফাঁকি খেলেন।",
      "ফোডেনের দ্বিতীয় গোল ছিল ব্যক্তিগত দক্ষতার নিদর্শন। মার্টিনেলির ৮৮ মিনিটের গোলটি সবচেয়ে নাটকীয় — সংকীর্ণ কোণ থেকে লো ড্রিভেন শট।",
      "ভক্ত ও বিশেষজ্ঞরা এটিকে প্রিমিয়ার লিগ ইতিহাসের সেরা ২-২ ড্র বলছেন।",
    ],
  },
  'Bangladesh 6-wicket win highlights vs India': {
    en: [
      "Relive every boundary, six and crucial wicket from Bangladesh's historic 6-wicket win over India in the T20I series decider.",
      "The highlight reel begins with Taskin Ahmed's devastating opening spell — three wickets in four overs that left India reeling at 22/3 and set the tone for the entire match.",
      "Then comes Litton Das's electric 42-ball innings up top, featuring five fours and two sixes. The Shakib montage is arguably the best section: three sixes in the 15th over changing the entire complexion of the chase.",
      "The final highlight is the last-over celebration as Towhid Hridoy hit the winning runs — and the scenes from the dressing room, the stadium and the streets of Dhaka that followed.",
    ],
    bn: [
      "ভারতের বিপক্ষে বাংলাদেশের ঐতিহাসিক ৬ উইকেটের জয়ের প্রতিটি চার, ছক্কা ও গুরুত্বপূর্ণ উইকেটের পুনরায় আনুভব করুন।",
      "হাইলাইট শুরু হয় তাসকিন আহমেদের ধ্বংসাত্মক ওপেনিং স্পেল দিয়ে — ৪ ওভারে ৩ উইকেট, ভারত ২২/৩-এ।",
      "এরপর লিটন দাসের বৈদ্যুতিক ৪২ বলের ইনিংস, পাঁচটি চার এবং দুটি ছক্কা। শাকিব হাইলাইটস সম্ভবত সেরা অংশ: ১৫তম ওভারে তিনটি ছক্কা যা রান তাড়ার সম্পূর্ণ চিত্র বদলে দেয়।",
      "শেষে তৌহিদ হৃদয়ের বিজয়ী রান এবং ড্রেসিং রুম, স্টেডিয়াম ও ঢাকার রাজপথের উল্লাসের দৃশ্য।",
    ],
  },
  'Celtics vs Knicks - Top 10 Plays': {
    en: [
      "The Eastern Conference semi-final between the Boston Celtics and New York Knicks produced some jaw-dropping moments in a series bursting with talent, intensity and drama.",
      "Number 10 is Jalen Brunson's coast-to-coast layup to force overtime in Game 3. Number 7 is Jaylen Brown's poster dunk over Isaiah Hartenstein. But nothing topped Jayson Tatum's buzzer-beater triple in Game 5 that sent the TD Garden crowd into absolute pandemonium.",
      "The Knicks' defensive intensity was equally impressive: Julius Randle's block on Tatum in Game 4 was perhaps the defensive play of the playoffs.",
      "Both fanbases are already calling this the greatest Celtics-Knicks series in 30 years, and the series is only halfway through.",
    ],
    bn: [
      "বোস্টন সেলটিক্স ও নিউ ইয়র্ক নিক্সের ইস্টার্ন কনফারেন্স সেমিফাইনালে অবিশ্বাস্য কিছু মুহূর্ত সৃষ্টি হয়েছে।",
      "দশ নম্বরে জ্যালেন ব্রুনসনের কোস্ট-টু-কোস্ট লেআপ। সাত নম্বরে জেলেন ব্রাউনের পোস্টার ডাঙ্ক। কিন্তু সবার উপরে ছিল গেম ৫-এ জেসন টাটামের বাজার-বিটার ট্রিপল যা টিডি গার্ডেনকে উৎসবে মুখরিত করে।",
      "নিক্সের ডিফেন্সিভ তীব্রতাও ছিল চমৎকার: গেম ৪-এ জুলিউস রান্ডলের টাটামের উপর ব্লকটি সম্ভবত প্লে-অফের সেরা ডিফেন্সিভ প্লে।",
      "দুই দলের ভক্তরা এটিকে ৩০ বছরে সেলটিক্স-নিক্সের সেরা সিরিজ বলছেন।",
    ],
  },
};

// ────────────────────────────────────────────────────────────────────────────
const categoriesData = [
  { id: 'all',        en: 'All Sports',  bn: 'সব খেলা',    icon: '🏆' },
  { id: 'cricket',   en: 'Cricket',     bn: 'ক্রিকেট',    icon: '🏏' },
  { id: 'football',  en: 'Football',    bn: 'ফুটবল',      icon: '⚽' },
  { id: 'basketball',en: 'Basketball',  bn: 'বাস্কেটবল',  icon: '🏀' },
  { id: 'tennis',    en: 'Tennis',      bn: 'টেনিস',      icon: '🎾' },
  { id: 'kabaddi',   en: 'Kabaddi',     bn: 'কাবাডি',     icon: '🤼' },
  { id: 'chess',     en: 'Chess',       bn: 'দাবা',       icon: '♟️' },
  { id: 'swimming',  en: 'Swimming',    bn: 'সাঁতার',     icon: '🏊' },
];

const featuredNewsData = [
  {
    id: 1, category: 'cricket', badge: 'Bangladesh', badgeColor: 'bg-green-600',
    titleEn: 'Bangladesh Beat India in Historic T20 Series Win',
    titleBn: 'ঐতিহাসিক টি২০ সিরিজে বাংলাদেশ ভারতকে হারিয়েছে',
    descEn: 'Bangladesh clinched the 3-match T20I series 2-1 against India in a stunning performance by Shakib Al Hasan and Litton Das.',
    descBn: 'শাকিব আল হাসান ও লিটন দাসের অসাধারণ পারফরম্যান্সে বাংলাদেশ ভারতের বিপক্ষে ৩ ম্যাচের টি২০আই সিরিজ ২-১ ব্যবধানে জিতেছে।',
    icon: '🏏', timeEn: '2 hours ago', timeBn: '২ ঘণ্টা আগে', views: '142K', color: 'from-green-900/80 to-green-700/40',
  },
  {
    id: 2, category: 'football', badge: 'Premier League', badgeColor: 'bg-purple-600',
    titleEn: 'Manchester City vs Arsenal: Title Race Goes to Final Day',
    titleBn: 'ম্যানচেস্টার সিটি বনাম আর্সেনাল: টাইটেল রেস শেষ দিনে',
    descEn: 'An epic 2-2 draw at the Etihad means the Premier League title will be decided on the final matchday of the season.',
    descBn: 'ইতিহাদে ২-২ ড্র মানে প্রিমিয়ার লিগ শিরোপা সিজনের শেষ ম্যাচডেতে নির্ধারিত হবে।',
    icon: '⚽', timeEn: '5 hours ago', timeBn: '৫ ঘণ্টা আগে', views: '384K', color: 'from-purple-900/80 to-purple-700/40',
  },
  {
    id: 3, category: 'cricket', badge: 'ICC World Cup', badgeColor: 'bg-blue-600',
    titleEn: 'India vs Pakistan World Cup Thriller Ends in Super Over',
    titleBn: 'ভারত বনাম পাকিস্তান বিশ্বকাপ থ্রিলার সুপার ওভারে শেষ',
    descEn: 'In the most watched cricket match of the decade, India edged Pakistan in a nerve-wracking Super Over to advance to the semi-finals.',
    descBn: 'দশকের সবচেয়ে বেশি দেখা ক্রিকেট ম্যাচে ভারত টানটান সুপার ওভারে পাকিস্তানকে হারিয়ে সেমিফাইনালে উঠেছে।',
    icon: '🏏', timeEn: '1 day ago', timeBn: '১ দিন আগে', views: '2.1M', color: 'from-blue-900/80 to-blue-700/40',
  },
];

const latestNewsData = [
  { id: 1, cat: 'cricket',    icon: '🏏', badge: 'BD',   titleEn: 'Mustafizur Rahman named Player of the Series vs Sri Lanka',           titleBn: 'মুস্তাফিজুর রহমান শ্রীলংকার বিপক্ষে সিরিজের সেরা খেলোয়াড়',                    timeEn: '30 min ago', timeBn: '৩০ মিনিট আগে', views: '18K' },
  { id: 2, cat: 'football',   icon: '⚽', badge: 'Intl', titleEn: 'Mbappe scores hat-trick as Real Madrid rout Bayern 4-1',              titleBn: 'রিয়াল মাদ্রিদের বায়ার্নকে ৪-১ গোলে পরাজয়ে এমবাপ্পের হ্যাটট্রিক',             timeEn: '1 hr ago',   timeBn: '১ ঘণ্টা আগে',  views: '95K' },
  { id: 3, cat: 'basketball', icon: '🏀', badge: 'NBA',  titleEn: 'LeBron James breaks all-time playoff assists record',                 titleBn: 'লেব্রন জেমস প্লে-অফ অ্যাসিস্টের সর্বকালীন রেকর্ড ভাঙলেন',                   timeEn: '2 hr ago',   timeBn: '২ ঘণ্টা আগে', views: '67K' },
  { id: 4, cat: 'cricket',    icon: '🏏', badge: 'BD',   titleEn: 'BCB announces squad for upcoming Zimbabwe series',                    titleBn: 'আগামী জিম্বাবুয়ে সিরিজের জন্য বিসিবি দল ঘোষণা করেছে',                        timeEn: '3 hr ago',   timeBn: '৩ ঘণ্টা আগে', views: '24K' },
  { id: 5, cat: 'tennis',     icon: '🎾', badge: 'ATP',  titleEn: 'Alcaraz defeats Djokovic in thrilling 5-set Wimbledon final',         titleBn: 'উত্তেজনাপূর্ণ ৫ সেটের উইম্বলডন ফাইনালে আলকারাজ জকোভিচকে হারালেন',           timeEn: '4 hr ago',   timeBn: '৪ ঘণ্টা আগে', views: '112K' },
  { id: 6, cat: 'football',   icon: '⚽', badge: 'BD',   titleEn: 'Bangladesh football team qualifies for SAFF Championship final',      titleBn: 'বাংলাদেশ ফুটবল দল সাফ চ্যাম্পিয়নশিপ ফাইনালে উঠেছে',                         timeEn: '5 hr ago',   timeBn: '৫ ঘণ্টা আগে', views: '31K' },
  { id: 7, cat: 'chess',      icon: '♟️', badge: 'BD',  titleEn: 'Bangladeshi GM Enamul Hossain wins Asian Chess Championship',          titleBn: 'বাংলাদেশি গ্র্যান্ডমাস্টার এনামুল হোসেন এশিয়ান দাবা চ্যাম্পিয়নশিপ জিতেছেন', timeEn: '6 hr ago',   timeBn: '৬ ঘণ্টা আগে', views: '8K'  },
  { id: 8, cat: 'kabaddi',    icon: '🤼', badge: 'BD',   titleEn: 'Bangladesh Kabaddi team wins gold at South Asian Games 2026',         titleBn: 'দক্ষিণ এশিয়ান গেমস ২০২৬-এ বাংলাদেশ কাবাডি দল স্বর্ণ জিতেছে',              timeEn: '8 hr ago',   timeBn: '৮ ঘণ্টা আগে', views: '15K' },
];

const trendingTopicsData = [
  { rank: 1, topicEn: 'Bangladesh vs India T20',   topicBn: 'বাংলাদেশ বনাম ভারত টি২০',       change: '+340%', hot: true  },
  { rank: 2, topicEn: 'Premier League Title Race', topicBn: 'প্রিমিয়ার লিগ টাইটেল রেস',     change: '+125%', hot: true  },
  { rank: 3, topicEn: 'ICC World Cup 2026',        topicBn: 'আইসিসি বিশ্বকাপ ২০২৬',          change: '+88%',  hot: false },
  { rank: 4, topicEn: 'NBA Playoffs 2026',         topicBn: 'এনবিএ প্লে-অফ ২০২৬',            change: '+72%',  hot: false },
  { rank: 5, topicEn: 'Wimbledon 2026',            topicBn: 'উইম্বলডন ২০২৬',                change: '+54%',  hot: false },
  { rank: 6, topicEn: 'FIFA U-20 World Cup',       topicBn: 'ফিফা অনূর্ধ্ব-২০ বিশ্বকাপ',   change: '+43%',  hot: false },
];

const upcomingMatchesData = [
  { id: '1', sport: 'Cricket',    leagueEn: 'BD vs Zimbabwe',         leagueBn: 'বিডি বনাম জিম্বাবুয়ে',    homeEn: 'Bangladesh',  homeBn: 'বাংলাদেশ',      awayEn: 'Zimbabwe', awayBn: 'জিম্বাবুয়ে', dateEn: 'Apr 2, 2026', dateBn: 'এপ্রিল ২, ২০২৬', timeEn: '10:00 AM', timeBn: 'সকাল ১০:০০', icon: '🏏' },
  { id: '2', sport: 'Football',   leagueEn: 'Champions League',       leagueBn: 'চ্যাম্পিয়নস লিগ',        homeEn: 'Real Madrid', homeBn: 'রিয়াল মাদ্রিদ', awayEn: 'PSG',      awayBn: 'পিএসজি',      dateEn: 'Apr 3, 2026', dateBn: 'এপ্রিল ৩, ২০২৬', timeEn: '09:00 PM', timeBn: 'রাত ৯:০০',    icon: '⚽' },
  { id: '3', sport: 'Tennis',     leagueEn: 'Monte-Carlo Masters',    leagueBn: 'মন্টে-কার্লো মাস্টার্স',  homeEn: 'Alcaraz',     homeBn: 'আলকারাজ',       awayEn: 'Sinner',   awayBn: 'সিনার',       dateEn: 'Apr 5, 2026', dateBn: 'এপ্রিল ৫, ২০২৬', timeEn: '06:30 PM', timeBn: 'সন্ধ্যা ৬:৩০', icon: '🎾' },
  { id: '4', sport: 'Basketball', leagueEn: 'NBA Playoffs R2',        leagueBn: 'এনবিএ প্লে-অফ আর২',       homeEn: 'Celtics',     homeBn: 'সেলটিক্স',      awayEn: 'Bucks',    awayBn: 'বাকস',        dateEn: 'Apr 6, 2026', dateBn: 'এপ্রিল ৬, ২০২৬', timeEn: '08:30 PM', timeBn: 'রাত ৮:৩০',    icon: '🏀' },
];

const standingsData = [
  { position: 1, teamEn: 'Manchester City', teamBn: 'ম্যানচেস্টার সিটি', played: 32, won: 22, drawn: 6, lost: 4,  points: 72 },
  { position: 2, teamEn: 'Arsenal',         teamBn: 'আর্সেনাল',           played: 32, won: 22, drawn: 5, lost: 5,  points: 71 },
  { position: 3, teamEn: 'Liverpool',       teamBn: 'লিভারপুল',           played: 32, won: 20, drawn: 7, lost: 5,  points: 67 },
  { position: 4, teamEn: 'Chelsea',         teamBn: 'চেলসি',              played: 32, won: 18, drawn: 6, lost: 8,  points: 60 },
  { position: 5, teamEn: 'Tottenham',       teamBn: 'টটেনহ্যাম',          played: 32, won: 16, drawn: 5, lost: 11, points: 53 },
];

const breakingTickerData = [
  { en: 'Bangladesh beat India by 6 wickets in 2nd T20I',                    bn: 'বাংলাদেশ দ্বিতীয় টি২০তে ৬ উইকেটে ভারতকে হারিয়েছে' },
  { en: 'Real Madrid sign new striker for record 180M EUR fee',               bn: 'রিয়াল মাদ্রিদ রেকর্ড ১৮০ মিলিয়ন ইউরোতে নতুন স্ট্রাইকার স্বাক্ষর করেছে' },
  { en: 'LeBron James signs 2-year extension with Lakers',                    bn: 'লেব্রন জেমস লেকার্সের সাথে ২ বছরের চুক্তি নবায়ন করেছেন' },
  { en: 'Wimbledon 2026 draw announced - Alcaraz top seed',                   bn: 'উইম্বলডন ২০২৬ ড্র ঘোষণা হয়েছে - আলকারাজ শীর্ষ বাছাই' },
  { en: 'IPL 2026 auction set for April 15 in Mumbai',                        bn: 'আইপিএল ২০২৬ নিলাম মুম্বাইয়ে ১৫ এপ্রিল নির্ধারিত' },
  { en: 'FIFA announces 2030 World Cup host nations',                         bn: 'ফিফা ২০৩০ বিশ্বকাপের আয়োজক দেশ ঘোষণা করেছে' },
];

const bangladeshNewsData = [
  { icon: '🏏', titleEn: "Tiger's Tour Schedule 2026 - Full Fixtures Revealed",    titleBn: 'টাইগারদের ২০২৬ সফর সূচি - সম্পূর্ণ ফিক্সচার প্রকাশ',           descEn: 'BCB announces a packed calendar with series against Zimbabwe, West Indies and a home series vs Australia.', descBn: 'বিসিবি জিম্বাবুয়ে, ওয়েস্ট ইন্ডিজের বিপক্ষে সিরিজ এবং অস্ট্রেলিয়ার বিপক্ষে হোম সিরিজ সহ একটি পূর্ণ সময়সূচি ঘোষণা করেছে।', timeEn: '1 hr ago',  timeBn: '১ ঘণ্টা আগে', badgeEn: 'Cricket',  badgeBn: 'ক্রিকেট' },
  { icon: '⚽', titleEn: 'BD Football Federation Unveils 5-Year Development Plan', titleBn: 'বিএফএফ ৫ বছরের উন্নয়ন পরিকল্পনা উন্মোচন করেছে',                descEn: 'BFF partners with FIFA to modernize grassroots football infrastructure across all 64 districts.',             descBn: 'বিএফএফ সমস্ত ৬৪ জেলায় তৃণমূল ফুটবল অবকাঠামো আধুনিক করতে ফিফার সাথে অংশীদারিত্ব করেছে।',                  timeEn: '4 hr ago',  timeBn: '৪ ঘণ্টা আগে', badgeEn: 'Football',  badgeBn: 'ফুটবল' },
  { icon: '🤼', titleEn: 'Bangladesh Wins Gold in Kabaddi at South Asian Games',   titleBn: 'দক্ষিণ এশিয়ান গেমসে কাবাডিতে বাংলাদেশ স্বর্ণ জিতেছে',         descEn: 'National Kabaddi team defeats India 42-38 in a thrilling final to clinch the gold medal.',                  descBn: 'জাতীয় কাবাডি দল থ্রিলিং ফাইনালে ভারতকে ৪২-৩৮ পয়েন্টে হারিয়ে স্বর্ণপদক জিতেছে।',                          timeEn: '6 hr ago',  timeBn: '৬ ঘণ্টা আগে', badgeEn: 'Kabaddi',  badgeBn: 'কাবাডি' },
  { icon: '♟️', titleEn: "GM Enamul Hossain - Bangladesh's Chess Pride",           titleBn: 'গ্র্যান্ডমাস্টার এনামুল হোসেন - বাংলাদেশের দাবার গর্ব',        descEn: "Bangladeshi grandmaster tops Asian Chess Championship standings, all eyes now on World event.",             descBn: 'বাংলাদেশি গ্র্যান্ডমাস্টার এশিয়ান দাবা চ্যাম্পিয়নশিপে শীর্ষে, এখন সবার দৃষ্টি বিশ্ব অনুষ্ঠানের দিকে।',  timeEn: '8 hr ago',  timeBn: '৮ ঘণ্টা আগে', badgeEn: 'Chess',    badgeBn: 'দাবা' },
];

const highlightsData = [
  { icon: '⚽', titleEn: 'Man City vs Arsenal - Best Goals',              titleBn: 'ম্যান সিটি বনাম আর্সেনাল - সেরা গোলগুলো',                leagueEn: 'Premier League', leagueBn: 'প্রিমিয়ার লিগ',  views: '1.2M', timeEn: '5 hrs ago', timeBn: '৫ ঘণ্টা আগে' },
  { icon: '🏏', titleEn: 'Bangladesh 6-wicket win highlights vs India',   titleBn: 'ভারতের বিপক্ষে বাংলাদেশের ৬ উইকেট জয়ের হাইলাইটস',    leagueEn: 'T20I Series',    leagueBn: 'টি২০আই সিরিজ',   views: '890K', timeEn: '2 hrs ago', timeBn: '২ ঘণ্টা আগে' },
  { icon: '🏀', titleEn: 'Celtics vs Knicks - Top 10 Plays',             titleBn: 'সেলটিক্স বনাম নিক্স - সেরা ১০ প্লে',                   leagueEn: 'NBA Playoffs',   leagueBn: 'এনবিএ প্লে-অফ', views: '420K', timeEn: '3 hrs ago', timeBn: '৩ ঘণ্টা আগে' },
];

const Sports = () => {
  const { language } = useLanguage();
  const isBn = language === 'BN';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<ArticlePreview | null>(null);

  const openArticle = (article: ArticlePreview) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeArticle = () => setSelectedArticle(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredNewsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % breakingTickerData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = latestNewsData.filter((n) => {
    const matchCat = activeCategory === 'all' || n.cat === activeCategory;
    const title = isBn ? n.titleBn : n.titleEn;
    const matchSearch = searchQuery === '' || title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = featuredNewsData[featuredIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Article Detail Overlay ───────────────────────────────────────── */}
      {selectedArticle && (() => {
        const body = articleBodies[selectedArticle.titleEn];
        const paragraphs = body ? (isBn ? body.bn : body.en) : [];
        return (
          <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
            {/* Sticky top bar */}
            <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10 px-4 py-3 flex items-center gap-3">
              <button
                onClick={closeArticle}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {isBn ? 'ফিরে যান' : 'Back'}
              </button>
              <span className="text-muted-foreground text-sm">|</span>
              <span className="text-sm text-muted-foreground truncate">{isBn ? 'স্পোর্টস নিউজ' : 'Sports News'}</span>
            </div>

            {/* Article content */}
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
              {/* Icon + badge */}
              <div className="flex items-center gap-3">
                <span className="text-5xl">{selectedArticle.icon}</span>
                {selectedArticle.badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${selectedArticle.badgeColor ?? 'bg-primary'}`}>
                    {selectedArticle.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {isBn ? selectedArticle.titleBn : selectedArticle.titleEn}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-3">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{isBn ? selectedArticle.timeBn : selectedArticle.timeEn}</span>
                {selectedArticle.views && <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{selectedArticle.views}</span>}
                {selectedArticle.author && <span className="flex items-center gap-1"><User className="w-4 h-4" />{selectedArticle.author}</span>}
                <button className="flex items-center gap-1 hover:text-primary ml-auto"><Share2 className="w-4 h-4" />{isBn ? 'শেয়ার' : 'Share'}</button>
                <button className="flex items-center gap-1 hover:text-primary"><BookmarkPlus className="w-4 h-4" />{isBn ? 'সেভ' : 'Save'}</button>
              </div>

              {/* Lead / description */}
              <p className="text-base font-medium leading-relaxed text-foreground/90 border-l-4 border-primary pl-4">
                {isBn ? selectedArticle.descBn : selectedArticle.descEn}
              </p>

              {/* Body paragraphs */}
              {paragraphs.length > 0 ? (
                <div className="space-y-4">
                  {paragraphs.map((para, idx) => (
                    <p key={idx} className="text-base leading-relaxed text-foreground/80">{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  {isBn ? 'সম্পূর্ণ নিবন্ধ শীঘ্রই আসছে।' : 'Full article coming soon.'}
                </p>
              )}

              {/* Back button at bottom */}
              <button
                onClick={closeArticle}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-secondary transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                {isBn ? 'সব স্পোর্টস নিউজ দেখুন' : 'View all Sports News'}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="flex items-center gap-1 font-bold text-xs whitespace-nowrap shrink-0 bg-white text-red-600 px-2 py-0.5 rounded">
            <Zap className="w-3 h-3" /> {isBn ? 'ব্রেকিং' : 'BREAKING'}
          </span>
          <div className="overflow-hidden flex-1">
            <p className="animate-pulse text-sm font-medium truncate">
              {isBn ? breakingTickerData[tickerIndex].bn : breakingTickerData[tickerIndex].en}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              {isBn ? 'স্পোর্টস নিউজ' : 'Sports News'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isBn ? 'বাংলাদেশ ও বিশ্বের সর্বশেষ খেলাধুলার সংবাদ' : 'Latest Bangladesh and worldwide sports coverage'}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary text-sm transition-colors">
            <RefreshCw className="w-4 h-4" /> {isBn ? 'রিফ্রেশ' : 'Refresh'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'খেলাধুলার সংবাদ খুঁজুন...' : 'Search sports news...'}
            className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-secondary/30 focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                  : 'border-border hover:bg-secondary text-muted-foreground'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{isBn ? cat.bn : cat.en}</span>
            </button>
          ))}
        </div>

        {/* Featured Slider */}
        <section>
          <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 cursor-pointer group bg-secondary">
            <div className={`absolute inset-0 bg-gradient-to-r ${featured.color} z-10`} />
            <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20 select-none z-0">
              {featured.icon}
            </div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${featured.badgeColor}`}>
                  {featured.badge}
                </span>
                <span className="text-white/70 text-xs">{isBn ? featured.timeBn : featured.timeEn}</span>
                <span className="text-white/70 text-xs flex items-center gap-1">
                  <Eye className="w-3 h-3" />{featured.views}
                </span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white leading-tight mb-2 drop-shadow">
                {isBn ? featured.titleBn : featured.titleEn}
              </h2>
              <p className="text-white/80 text-sm line-clamp-2 hidden md:block">
                {isBn ? featured.descBn : featured.descEn}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => openArticle({ titleEn: featured.titleEn, titleBn: featured.titleBn, descEn: featured.descEn, descBn: featured.descBn, icon: featured.icon, badge: featured.badge, badgeColor: featured.badgeColor, timeEn: featured.timeEn, timeBn: featured.timeBn, views: featured.views })}
                  className="px-5 py-2 bg-white text-foreground rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
                  {isBn ? 'সম্পূর্ণ পড়ুন' : 'Read Full Story'}
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <BookmarkPlus className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-4 right-6 z-30 flex gap-2">
              {featuredNewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === featuredIndex ? 'bg-white w-6' : 'bg-white/40 w-2'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Latest News */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                {isBn ? 'সর্বশেষ সংবাদ' : 'Latest News'}
                {activeCategory !== 'all' && (
                  <Badge variant="secondary" className="ml-1">
                    {categoriesData.find(c => c.id === activeCategory)?.icon}
                    {' '}{isBn ? categoriesData.find(c => c.id === activeCategory)?.bn : categoriesData.find(c => c.id === activeCategory)?.en}
                  </Badge>
                )}
              </h2>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <Filter className="w-4 h-4" /> {isBn ? 'ফিল্টার' : 'Filter'}
              </button>
            </div>

            <div className="space-y-3">
              {filteredNews.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>{isBn ? 'এই বিভাগে কোনো সংবাদ পাওয়া যায়নি' : 'No news found for this category'}</p>
                </div>
              ) : filteredNews.map((item) => (
                <div key={item.id} onClick={() => openArticle({ titleEn: item.titleEn, titleBn: item.titleBn, descEn: item.titleEn, descBn: item.titleBn, icon: item.icon, badge: item.badge, timeEn: item.timeEn, timeBn: item.timeBn, views: item.views })} className="group flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={item.badge === 'BD' ? 'default' : 'secondary'} className="text-xs">
                        {item.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{isBn ? item.timeBn : item.timeEn}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {isBn ? item.titleBn : item.titleEn}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.views}</span>
                      <button className="flex items-center gap-1 hover:text-primary"><BookmarkPlus className="w-3 h-3" /> {isBn ? 'সেভ' : 'Save'}</button>
                      <button className="flex items-center gap-1 hover:text-primary"><Share2 className="w-3 h-3" /> {isBn ? 'শেয়ার' : 'Share'}</button>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {filteredNews.length > 0 && (
              <button className="w-full py-3 border border-border rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
                {isBn ? 'আরো সংবাদ লোড করুন' : 'Load More News'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Trending Topics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {isBn ? 'ট্রেন্ডিং' : 'Trending'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopicsData.map((item) => (
                  <div key={item.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                    <span className="text-lg font-bold text-primary w-6 text-center">{item.rank}</span>
                    <span className="text-sm font-medium flex-1">{isBn ? item.topicBn : item.topicEn}</span>
                    <div className="flex items-center gap-1">
                      {item.hot && <Flame className="w-3 h-3 text-orange-500" />}
                      <span className="text-xs text-green-500 font-bold">{item.change}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Matches */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {isBn ? 'আসন্ন ম্যাচ' : 'Upcoming Matches'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingMatchesData.map((match) => (
                  <div key={match.id} className="p-3 border border-border rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{match.icon}</span>
                      <span className="text-xs text-muted-foreground">{isBn ? match.leagueBn : match.leagueEn}</span>
                    </div>
                    <div className="text-sm font-semibold">
                      {isBn ? match.homeBn : match.homeEn} <span className="text-muted-foreground font-normal">{isBn ? 'বনাম' : 'vs'}</span> {isBn ? match.awayBn : match.awayEn}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{isBn ? match.dateBn : match.dateEn}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{isBn ? match.timeBn : match.timeEn}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Standings + Highlights + Bangladesh Tabs */}
        <Tabs defaultValue="standings" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="standings">{isBn ? 'পয়েন্ট টেবিল' : 'Standings'}</TabsTrigger>
            <TabsTrigger value="highlights">{isBn ? 'হাইলাইটস' : 'Highlights'}</TabsTrigger>
            <TabsTrigger value="bangladesh">{isBn ? 'বাংলাদেশ' : 'Bangladesh'}</TabsTrigger>
          </TabsList>

          <TabsContent value="standings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span>{isBn ? 'সকার' : 'Soccer'}</span> {isBn ? 'প্রিমিয়ার লিগ ২০২৫/২০২৬' : 'Premier League 2025/2026'}
                  </CardTitle>
                  <Badge variant="outline">{isBn ? 'জিডব্লিউ ৩২' : 'GW 32'}</Badge>
                </div>
                <CardDescription>{isBn ? 'শীর্ষ ৫ দল' : 'Top 5 Teams'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-3 font-medium pr-3">#</th>
                        <th className="pb-3 font-medium">{isBn ? 'দল' : 'Team'}</th>
                        <th className="pb-3 font-medium text-center px-2">P</th>
                        <th className="pb-3 font-medium text-center px-2">W</th>
                        <th className="pb-3 font-medium text-center px-2">D</th>
                        <th className="pb-3 font-medium text-center px-2">L</th>
                        <th className="pb-3 font-bold text-center px-2">{isBn ? 'পয়েন্ট' : 'Pts'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standingsData.map((row) => (
                        <tr key={row.position} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 pr-3">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{row.position}</span>
                              {row.position <= 4 && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                            </div>
                          </td>
                          <td className="py-3 font-semibold">{isBn ? row.teamBn : row.teamEn}</td>
                          <td className="py-3 text-center text-muted-foreground px-2">{row.played}</td>
                          <td className="py-3 text-center text-green-600 font-medium px-2">{row.won}</td>
                          <td className="py-3 text-center text-muted-foreground px-2">{row.drawn}</td>
                          <td className="py-3 text-center text-red-500 px-2">{row.lost}</td>
                          <td className="py-3 text-center font-bold text-primary px-2">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="highlights">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlightsData.map((h, i) => (
                <div key={i} onClick={() => openArticle({ titleEn: h.titleEn, titleBn: h.titleBn, descEn: h.titleEn, descBn: h.titleBn, icon: h.icon, badge: isBn ? h.leagueBn : h.leagueEn, timeEn: h.timeEn, timeBn: h.timeBn, views: h.views })} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary to-secondary flex items-center justify-center relative">
                    <span className="text-6xl group-hover:scale-110 transition-transform">{h.icon}</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                      </div>
                    </div>
                    <Badge variant="destructive" className="absolute top-2 left-2 text-xs">HD</Badge>
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">{isBn ? h.leagueBn : h.leagueEn}</Badge>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">{isBn ? h.titleBn : h.titleEn}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{h.views}</span>
                      <span>{isBn ? h.timeBn : h.timeEn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bangladesh">
            <div className="space-y-3">
              {bangladeshNewsData.map((n, i) => (
                <div key={i} onClick={() => openArticle({ titleEn: n.titleEn, titleBn: n.titleBn, descEn: n.descEn, descBn: n.descBn, icon: n.icon, badge: n.badgeEn, timeEn: n.timeEn, timeBn: n.timeBn })} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {n.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="text-xs bg-green-600">BD</Badge>
                      <Badge variant="outline" className="text-xs">{isBn ? n.badgeBn : n.badgeEn}</Badge>
                      <span className="text-xs text-muted-foreground">{isBn ? n.timeBn : n.timeEn}</span>
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{isBn ? n.titleBn : n.titleEn}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{isBn ? n.descBn : n.descEn}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Ad Banner */}
        <div className="w-full h-24 bg-secondary/50 border border-dashed border-border rounded-2xl flex items-center justify-center text-muted-foreground text-sm">
          {isBn ? 'বিজ্ঞাপনের স্থান' : 'Advertisement Space'}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Sports;
