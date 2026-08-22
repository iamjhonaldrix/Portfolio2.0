import { FaPhone, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Contacts() {
  const contactLinks = [
    {
      name: "Phone",
      href: "tel:+639760851983",
      icon: <FaPhone className="w-5 h-5" />,
      label: "+63 976 085 1983",
    },
    {
      name: "GitHub",
      href: "https://github.com/https://github.com/iamjhonaldrix",
      icon: <FaGithub className="w-5 h-5" />,
      label: "github.com/iamjhonaldrix",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/jhonaldrix.obernil/",
      icon: <FaFacebook className="w-5 h-5" />,
      label: "facebook.com/yourusername",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jhon-aldrix-bernil-331b8a243/",
      icon: <FaLinkedin className="w-5 h-5" />,
      label: "linkedin.com/in/yourusername",
    },
  ];

  return (
    <section className="py-8 px-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Contact Me
      </h2>
      <div className="flex flex-col gap-4">
        {contactLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-gray-600 dark:text-gray-300">{item.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}