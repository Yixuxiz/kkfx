export default function AboutPage() {
  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-text-primary mb-8">
        关于
      </h1>

      <div className="prose max-w-none">
        <p className="text-text-secondary leading-relaxed">
          你好，我是 K.K.。
        </p>
        <p className="text-text-secondary leading-relaxed">
          这是我的个人博客，用于记录生活点滴、技术思考和读书笔记。
        </p>
        <p className="text-text-secondary leading-relaxed">
          如果你有任何想法或建议，欢迎通过邮件联系我。
        </p>
        <h2>联系方式</h2>
        <p className="text-text-secondary leading-relaxed">
          Email: contact@kkblog.com
        </p>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: 'K.K. - 关于',
  };
}
