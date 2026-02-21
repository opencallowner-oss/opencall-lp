import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  Users,
  BarChart,
  ArrowRight,
  Coins,
  ThumbsUp,
  MessageSquare,
  Building,
  User,
  Mail,
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact form (Formspree)
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  // TODO: Replace with your Formspree endpoint, e.g. https://formspree.io/f/xxxxxx
  const FORM_ENDPOINT = 'https://formspree.io/f/mykdnzlj';
  // App UI mockup: bring hovered phone to the front
  const [hoveredPhone, setHoveredPhone] = useState<'back' | 'front' | null>(null);

  // Legal/Info modal
  type LegalKey = 'operator' | 'terms' | 'privacy' | 'tokusho';
  const [legalOpen, setLegalOpen] = useState<LegalKey | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setIsSending(true);

    try {
      // Use FormData (recommended by Formspree for AJAX)
      // Configure recipient as opencall.owner@gmail.com on Formspree.
      const fd = new FormData();
      fd.append('companyName', formData.companyName);
      fd.append('contactName', formData.contactName);
      fd.append('email', formData.email);
      fd.append('message', formData.message);
      fd.append('_meta', JSON.stringify({ source: 'OpenCall LP' }));

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: fd,
      });

      if (!res.ok) {
        let msg = '送信に失敗しました。時間を置いて再度お試しください。';
        try {
          const data = await res.json();
          if (data?.errors?.[0]?.message) msg = data.errors[0].message;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setIsSubmitted(true);
      setFormData({ companyName: '', contactName: '', email: '', message: '' });
    } catch (err: any) {
      setSubmitError(err?.message ?? '送信に失敗しました。');
    } finally {
      setIsSending(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // DEV "tests" (sanity checks) - harmless in production
  useEffect(() => {
    try {
      console.assert(typeof scrollToContact === 'function', 'scrollToContact should be a function');
      console.assert(
        ['companyName', 'contactName', 'email', 'message'].every((k) => Object.prototype.hasOwnProperty.call(formData, k)),
        'formData should have required keys'
      );
      console.assert(typeof handleSubmit === 'function', 'handleSubmit should be a function');
    } catch {
      // no-op
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#0076DD] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#0076DD]">OpenCall</span>
          </div>
          <button
            onClick={scrollToContact}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0076DD] hover:bg-blue-700 transition-colors shadow-sm"
          >
            お問い合わせ
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-[120px]"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-100/40 blur-[120px]"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-flex items-center gap-3 py-2.5 px-6 rounded-full bg-white text-[#0076DD] text-base font-bold mb-10 border border-blue-100 shadow-md scale-[1.2] origin-top">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0076DD]"></span>
            </span>
            公募 × 投票 × ポイ活
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.15]">
            リアルな声を<span className="text-[#0076DD]">アイデア</span>に
            <br className="hidden sm:block" />
            ユーザーの<span className="text-[#0076DD]">“反応”</span>が、数字でわかる
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
            ユーザー同士がアイデアを評価する「投票制度」により、ローンチ前に反応を可視化。
            <br className="hidden sm:block" />
            投票データを根拠に意思決定と社内合意を後押しします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-[#0076DD] hover:bg-blue-700 transition-all shadow-[0_8px_20px_rgb(0,118,221,0.25)] hover:shadow-[0_12px_25px_rgb(0,118,221,0.35)] hover:-translate-y-1"
            >
              無料で資料請求・お問い合わせ
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">こんなお悩みありませんか？</h2>
            <div className="w-20 h-1.5 bg-[#0076DD] mx-auto rounded-full"></div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-12 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
              style={{ animationDelay: '2s' }}
            ></div>
            <ul className="space-y-8 relative z-10">
              {[
                '斬新な企画やユーザーのリアルな声・アイデアを求めている',
                '公募を出しても、欲しい層から十分な応募・投票が集まらない',
                'どの案が支持されるか根拠がなく、社内で決めきれない／合意が進まない',
              ].map((problem, idx) => (
                <li key={idx} className="flex items-start group">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-500 mt-0.5 group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="ml-5 text-lg md:text-xl text-gray-700 leading-relaxed font-medium">{problem}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100/50 text-center relative z-10">
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                そのお悩み、<span className="text-[#0076DD] text-3xl mx-2">OpenCall</span>がすべて解決します！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">OpenCallが選ばれる3つの理由</h2>
            <div className="w-20 h-1.5 bg-[#0076DD] mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ポイ活制度により応募が集まりやすく、投票で反応がわかる。
              <br className="hidden sm:block" />
              採用判断の根拠ができ、社内説明がスムーズに。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,118,221,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0076DD] mb-8 group-hover:scale-110 transition-transform duration-300">
                <Coins className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">応募が増える集客設計</h3>
              <p className="text-gray-600 leading-relaxed">
                参加によるポイント付与で、従来の公募よりも大量のアイデアやユーザーが集まります。
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,118,221,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0076DD] mb-8 group-hover:scale-110 transition-transform duration-300">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">「刺さるアイデア」が見える</h3>
              <p className="text-gray-600 leading-relaxed">
                集まったアイデアをユーザー同士で投票し、順位が可視化されます。上位案から検討でき、一次選考がスムーズになります。
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,118,221,0.08)] transition-all duration-300 group hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0076DD] mb-8 group-hover:scale-110 transition-transform duration-300">
                <BarChart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">リアルな市場調査データ</h3>
              <p className="text-gray-600 leading-relaxed">
                投票結果を、企画の支持率データとして活用。年代・性別など属性別の支持も見え、社内説明の根拠になります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App UI Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Device Images (mockups) */}
            <div className="w-full lg:w-1/2 relative min-h-[620px] sm:min-h-[680px] flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[460px] h-full mx-auto lg:mx-0">
                {/* Phone 1 (back) */}
                <div
                  onMouseEnter={() => setHoveredPhone('back')}
                  onMouseLeave={() => setHoveredPhone(null)}
                  className={`absolute left-0 sm:left-4 top-0 w-[240px] sm:w-[280px] ${hoveredPhone === 'back' ? 'z-40' : 'z-10'} group cursor-default`}
                >
                  <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-gray-900 border border-gray-700 p-[3px] sm:p-1 shadow-[-3px_3px_0_#27272a,-15px_20px_40px_rgba(0,0,0,0.25)] transform -rotate-6 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] group-hover:z-30">
                    <div className="relative rounded-[2.35rem] sm:rounded-[2.85rem] bg-black p-1 sm:p-1.5 shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                      <div className="absolute inset-0 rounded-[2.35rem] sm:rounded-[2.85rem] bg-gradient-to-tr from-transparent via-transparent to-white/15 pointer-events-none z-20"></div>
                      <div className="absolute -inset-full h-[200%] w-[30%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[200%] pointer-events-none z-20"></div>

                      <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white relative z-10">
                        <img
                          src="https://lh3.googleusercontent.com/d/1bhtv9YQIAPP1pumEEDS5kJ0h9761q2Du"
                          alt="OpenCall ホーム画面"
                          className="w-full h-auto block"
                          onError={(e) => {
                            const img = e.currentTarget;
                            img.style.display = 'none';
                            const next = img.nextElementSibling;
                            if (next && next instanceof HTMLElement) next.style.display = 'flex';
                          }}
                        />
                        <div className="hidden bg-gray-100 flex-col items-center justify-center p-4 text-center border border-gray-200 w-full aspect-[9/19.5]">
                          <span className="text-gray-500 font-bold text-sm mb-1">ホーム画面</span>
                          <span className="text-[10px] text-gray-400 text-balance">
                            実際の環境ではここに
                            <br />
                            画像が表示されます
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone 2 (front) */}
                <div
                  onMouseEnter={() => setHoveredPhone('front')}
                  onMouseLeave={() => setHoveredPhone(null)}
                  className={`absolute right-0 sm:right-4 top-12 sm:top-[4.5rem] w-[240px] sm:w-[280px] ${hoveredPhone === 'front' ? 'z-40' : 'z-20'} group cursor-default`}
                >
                  <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-gray-900 border border-gray-700 p-[3px] sm:p-1 shadow-[3px_3px_0_#27272a,15px_20px_40px_rgba(0,0,0,0.3)] transform rotate-6 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:z-30">
                    <div className="relative rounded-[2.35rem] sm:rounded-[2.85rem] bg-black p-1 sm:p-1.5 shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                      <div className="absolute inset-0 rounded-[2.35rem] sm:rounded-[2.85rem] bg-gradient-to-tr from-transparent via-transparent to-white/15 pointer-events-none z-20"></div>
                      <div className="absolute -inset-full h-[200%] w-[30%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[200%] pointer-events-none z-20"></div>

                      <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white relative z-10">
                        <img
                          src="https://lh3.googleusercontent.com/d/1dqTKTJj-J0pJ_vSlQxgUL81-B9s2xs-E"
                          alt="OpenCall 投票画面"
                          className="w-full h-auto block"
                          onError={(e) => {
                            const img = e.currentTarget;
                            img.style.display = 'none';
                            const next = img.nextElementSibling;
                            if (next && next instanceof HTMLElement) next.style.display = 'flex';
                          }}
                        />
                        <div className="hidden bg-gray-100 flex-col items-center justify-center p-4 text-center border border-gray-200 w-full aspect-[9/19.5]">
                          <span className="text-gray-500 font-bold text-sm mb-1">投票画面</span>
                          <span className="text-[10px] text-gray-400 text-balance">
                            実際の環境ではここに
                            <br />
                            画像が表示されます
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="mb-8 border-b-2 border-blue-100 pb-4">
                <span className="block text-[#0076DD] font-bold text-sm tracking-widest uppercase mb-1">feature</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  「2択」で投票を高精度に
                </h3>
              </div>

              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">認知負荷を下げ</span>
                <span className="block">
                  <span className="text-[#0076DD]">ノイズの少ない投票データ</span>へ
                </span>
                <span className="block">“適当回答”を増やさない設計</span>
              </h4>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-8">
                2択に絞ることで離脱を抑え、回答がぶれにくい。設問を複雑にしないことで“適当な回答”が増えにくく、アイデアへの反応の差がはっきり出ます。集計結果は順位・属性を基に可視化され、一次選考や社内説明の根拠として活用できます。
              </p>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h5 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-[#0076DD]" />
                  運用負担を最小化
                </h5>
                <p className="text-sm text-gray-600">
                  必要事項を入力して公開するだけ。集計は自動で、共有までスムーズです。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">ご利用の流れ</h2>
            <div className="w-20 h-1.5 bg-[#0076DD] mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-24 left-[10%] w-[80%] h-0.5 bg-blue-200 z-0"></div>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: '01',
                  title: '公募の掲載',
                  desc: `募集テーマやポイントを設定し、
OpenCall上に公募を掲載します。`,
                  icon: <Building className="w-7 h-7" />,
                  user: '企業',
                },
                {
                  step: '02',
                  title: 'アイデア投稿＆投票',
                  desc: `アイデアを投稿し、ユーザー同士で
相互評価（投票）を行います。`,
                  icon: <Users className="w-7 h-7" />,
                  user: 'ユーザー',
                },
                {
                  step: '03',
                  title: '結果確認・データ納品',
                  desc: '投票で上位になった質の高いアイデアや、市場のリアルな評価データを納品します。',
                  icon: <CheckCircle className="w-7 h-7" />,
                  user: '企業',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="absolute -top-5 bg-[#0076DD] text-white text-sm font-extrabold px-6 py-1.5 rounded-full shadow-lg tracking-wider">
                    STEP {item.step}
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-blue-50/50 flex items-center justify-center text-[#0076DD] mt-6 mb-6 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">料金プラン</h2>
            <div className="w-20 h-1.5 bg-[#0076DD] mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              プロジェクトの規模や目的に合わせてお選びいただけます。
            </p>
            <p className="mt-3 text-sm text-gray-500">
              ※賞金（ポイント付与額）により料金が変動する場合があります。
            </p>
          </div>

          <div className="mb-8">
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <div className="border border-gray-100 rounded-3xl px-10 py-12 bg-white flex flex-col h-full min-h-[480px] md:min-h-[520px] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">お試しプラン</h4>
                <div className="text-center mb-8 pb-8 border-b border-gray-100">
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight">0</span>
                  <span className="text-gray-500 font-medium ml-1">円</span>
                </div>
                <ul className="space-y-5 mb-8 flex-1">
                  <li className="flex items-center text-sm text-gray-700 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                    公募の掲載が可能
                  </li>
                  <li className="flex items-center text-sm text-gray-700 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                    全アイデアの閲覧
                  </li>
                  <li className="flex items-center text-sm text-gray-400 opacity-50 p-3 rounded-xl">
                    <span className="w-5 h-5 mr-3 shrink-0 flex items-center justify-center font-bold">-</span>
                    投票結果（ランキング）は非公開
                  </li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-3xl px-10 py-12 bg-white relative shadow-sm hover:shadow-md transition-shadow flex flex-col h-full min-h-[480px] md:min-h-[520px]">
                <h4 className="text-xl font-bold text-[#0076DD] mb-4 text-center">スタンダードプラン</h4>
                <div className="text-center mb-8 pb-8 border-b border-blue-50">
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight">50,000</span>
                  <span className="text-gray-500 font-medium ml-1">円</span>
                </div>
                <ul className="space-y-5 mb-8 flex-1">
                  <li className="flex items-center text-sm text-gray-700 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    公募の掲載が可能
                  </li>
                  <li className="flex items-center text-sm text-gray-700 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    全アイデアの閲覧
                  </li>
                  <li className="flex items-center text-sm text-[#0076DD] font-bold p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    投票結果（ランキング）の閲覧
                  </li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-3xl px-10 py-12 bg-blue-50/40 flex flex-col h-full min-h-[480px] md:min-h-[520px] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-[#0076DD] mb-4 text-center">プレミアムプラン</h4>
                <div className="text-center mb-8 pb-8 border-b border-blue-50">
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight">100,000</span>
                  <span className="text-gray-500 font-medium ml-1">円</span>
                </div>
                <ul className="space-y-5 mb-8 flex-1">
                  <li className="flex items-center text-sm text-gray-700 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    公募の掲載が可能
                  </li>
                  <li className="flex items-center text-sm text-gray-700 p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    全アイデアの閲覧
                  </li>
                  <li className="flex items-center text-sm text-[#0076DD] font-bold p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    投票結果（ランキング）の閲覧
                  </li>
                  <li className="flex items-center text-sm text-[#0076DD] font-bold p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#0076DD] mr-3 shrink-0" />
                    投票ユーザーの属性分析データ
                    <br />
                    (年代・性別など)の閲覧
                  </li>
                  {/* spacer: keep inner alignment consistent */}
                  <li aria-hidden="true" className="flex items-center text-sm text-gray-700 opacity-0 select-none pointer-events-none p-3 rounded-xl">
                    <CheckCircle className="w-5 h-5 mr-3 shrink-0" />
                    spacer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0076DD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">お問い合わせ・資料請求</h2>
            <p className="text-blue-100">
              サービスの詳細や導入についてのご相談など、お気軽にお問い合わせください。
              <br />
              担当者より速やかにご連絡いたします。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">お問い合わせを受け付けました</h3>
                <p className="text-gray-600">
                  送信内容を確認のうえ、担当者よりご連絡いたします。
                  <br />
                  返信まで今しばらくお待ちください。
                </p>
                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-[#0076DD] font-medium hover:underline">
                  続けて入力する
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    会社名 <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2">必須</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0076DD] focus:border-[#0076DD] transition-colors outline-none"
                    placeholder="株式会社サンプル"
                  />
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    担当者名 <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2">必須</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0076DD] focus:border-[#0076DD] transition-colors outline-none"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    メールアドレス <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded ml-2">必須</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0076DD] focus:border-[#0076DD] transition-colors outline-none"
                    placeholder="taro.yamada@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    ご相談内容 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded ml-2">任意</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0076DD] focus:border-[#0076DD] transition-colors outline-none resize-none"
                    placeholder="資料請求を希望します。"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-[#0076DD] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0076DD] transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? '送信中…' : '上記の内容で送信する'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6 text-white/50">
            <span className="text-lg font-bold tracking-tight text-[#0076DD]">OpenCall</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-8">
            <button
              type="button"
              onClick={() => setLegalOpen('operator')}
              className="hover:text-white transition-colors"
            >
              運営者情報
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen('terms')}
              className="hover:text-white transition-colors"
            >
              利用規約
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen('privacy')}
              className="hover:text-white transition-colors"
            >
              プライバシーポリシー
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen('tokusho')}
              className="hover:text-white transition-colors"
            >
              特定商取引法に基づく表記
            </button>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} OpenCall. All rights reserved.</p>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="close"
            className="absolute inset-0 bg-black/40"
            onClick={() => setLegalOpen(null)}
          />
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {legalOpen === 'operator'
                  ? '運営者情報'
                  : legalOpen === 'terms'
                    ? '利用規約'
                    : legalOpen === 'privacy'
                      ? 'プライバシーポリシー'
                      : '特定商取引法に基づく表記'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalOpen(null)}
                className="px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100"
              >
                閉じる
              </button>
            </div>

            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm text-gray-700 leading-relaxed">
              {legalOpen === 'operator' ? (
                <div className="space-y-3">
                  <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                    <p>
                      <span className="font-bold">運営者</span>：明光悠人
                      <br />
                      <span className="font-bold">連絡先</span>：opencall.owner@gmail.com
                    </p>
                  </div>
                </div>
              ) : null}

              {legalOpen === 'terms' ? (
                <div className="space-y-4">
                  <p className="text-gray-600">本ページ（LP）は企業向けのサービス紹介・お問い合わせ受付を目的とします。</p>
                  <div className="space-y-2">
                    <p className="font-bold">1. 免責</p>
                    <p>
                      掲載内容の正確性・完全性には注意を払っていますが、内容を保証するものではありません。掲載内容は予告なく変更される場合があります。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">2. お問い合わせ</p>
                    <p>お問い合わせ内容は確認のうえ、順次ご連絡します。返信まで時間をいただく場合があります。</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">3. 知的財産</p>
                    <p>本サイト上の文章・画像・ロゴ等の無断転載を禁止します。</p>
                  </div>
                </div>
              ) : null}

              {legalOpen === 'privacy' ? (
                <div className="space-y-4">
                  <p>
                    OpenCall（以下「当方」）は、お問い合わせフォームを通じて取得する個人情報を、以下の目的で取り扱います。
                  </p>
                  <div className="space-y-2">
                    <p className="font-bold">1. 取得する情報</p>
                    <p>会社名、担当者名、メールアドレス、ご相談内容（任意）</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">2. 利用目的</p>
                    <p>お問い合わせへの回答、資料送付、サービス案内、連絡・対応のため</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">3. 外部サービスの利用</p>
                    <p>
                      お問い合わせの送信には Formspree を利用します。フォーム送信内容は Formspree を経由して当方に転送されます。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">4. 第三者提供</p>
                    <p>法令に基づく場合を除き、ご本人の同意なく第三者に提供しません。</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">5. お問い合わせ窓口</p>
                    <p>opencall.owner@gmail.com</p>
                  </div>
                </div>
              ) : null}

              {legalOpen === 'tokusho' ? (
                <div className="space-y-3">
                  <p className="text-gray-600">
                    ※現在、本サイト上でのオンライン決済・即時申込は行っておらず、原則としてお問い合わせ後に個別お見積り・契約となります。
                  </p>
                  <div className="rounded-xl border border-gray-200 p-4">
                    <p>
                      <span className="font-bold">事業者</span>：OpenCall（個人）
                      <br />
                      <span className="font-bold">連絡先</span>：opencall.owner@gmail.com
                      <br />
                      <span className="font-bold">販売価格</span>：料金プラン欄に表示（※ポイント付与額により変動する場合あり）
                      <br />
                      <span className="font-bold">支払方法・時期</span>：契約内容に応じて個別にご案内
                      <br />
                      <span className="font-bold">提供時期</span>：契約成立後に個別にご案内
                      <br />
                      <span className="font-bold">キャンセル等</span>：契約内容に応じて個別にご案内
                    </p>
                  </div>
                  <p className="text-gray-600">※必要に応じて、住所・電話番号等の追加開示をご検討ください。</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
