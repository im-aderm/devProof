/* eslint-disable @next/next/no-img-element */
export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Senior Backend Engineer @ Stripe",
      content:
        "DevProof finally gave me a way to show hiring managers the actual complexity of my distributed systems work without them needing to read through 100 files.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCvy0HyyDz-7BBimX0NxMp93rPicvjR9UqrckTDXRaZUvClh-TOwRb4QKKWkT6Pt292pFj1Cz93KHaOn_WhUEwLymrkeIeC5VYOyb6ewjo8sqTyyfsNHxPunGS6YhDFsy_rjKCA1bVjXShy0cV4M-mLmc8ZfAN5lIXvk1BRfcVghuWFzjx3Z3nVIM4AaJ5XMphKg4BfDFOWz_Lnr_ooP2PCCBczRbp0qU4GimBlrCV6cybMPSZGIZfjG9DZ1d0U-vB_Y8SjU3LlRmS9",
      border: "border-primary",
      labelColor: "text-primary",
    },
    {
      name: "Sarah Chen",
      role: "Engineering Lead @ Vercel",
      content:
        "The skill dashboards are scarily accurate. It identified my architectural strengths and weaknesses better than my last performance review.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCttE9XzWDprpycJYR33FF8HMxUqOkiKYL7BQtSCiAZBLQ83zqMZvarGnNmjFGI8_TX-MtuYpoij0BUnlWlS0E5O0cP8k_Iefe-6gqxuFy_4GOluuNs7vHYVfxQrGMVA_2gL6eZz6uWgFAJ6fv4bJTKgoy9Uhgl0BKqFp-qrWJv5CQt5Bcmt-iwtD-wokiA4Ffhccee7wmlD3_1rQH8RbtBVL4-BvVQqtuomgj8j8kQX3Zg_yt_k6IW51JRlg8ykWxTACupKTNgvrzA",
      border: "border-secondary",
      labelColor: "text-secondary",
    },
    {
      name: "James Wu",
      role: "Founder @ CodeScale",
      content:
        "We use DevProof to vet talent. It's the only tool that actually understands if a developer's GitHub history translates to real-world capability.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCU9_U0ur0v64mz74cjRxOeY3JB7xkPPALcuZCSAEMQs2-0zRo9CdjfZtplDlMEmMfB0GQ7vKSgp9GYGii8QADVu1axCdNIPtojnDQcScOvnon-1dNA_nKNIQjL8-WuIsp3RPNtTRErtcj-PZHoB5UQNmOYnhpq8RbwDdJbIdtzxVpgdawyCQCE4aeTOLNBn8Az0VGJ7S9UHDXKFBCkwbnBYaDUO_mAXso9dO4gcaSXZBTGjwsFkUpc0b0PuYYVp0SHDuWjWZ5MSA_",
      border: "border-tertiary",
      labelColor: "text-tertiary",
    },
  ];

  return (
    <section className="bg-surface-container-lowest px-6 py-section-gap">
      <div className="mx-auto max-w-container-max">
        <div className="mb-16 text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
            Loved by Elite Engineers
          </h2>
          <p className="text-on-surface-variant">
            The tool of choice for developers who value their craft.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className={`glass-card rounded-xl border-l-4 p-8 ${t.border}`}>
              <p className="font-body-base text-on-surface mb-8 leading-relaxed italic">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <img className="h-12 w-12 rounded-full object-cover" alt={t.name} src={t.avatar} />
                <div>
                  <div className="text-on-surface font-bold">{t.name}</div>
                  <div className={`font-label-bold text-xs uppercase ${t.labelColor}`}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
