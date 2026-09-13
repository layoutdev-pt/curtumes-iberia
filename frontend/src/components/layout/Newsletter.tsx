import { useState, type FormEvent } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const content = {
  PT: {
    title: "Subscreva A Nossa Newsletter",
    description: "Fique a par das últimas novidades, inovações sustentáveis e presenças em feiras internacionais da Curtumes Ibéria.",
    placeholder: "O seu melhor endereço de e-mail",
    button: "Subscrever Agora",
    success: "✅ Obrigado pela subscrição! Verifique a sua caixa de entrada em breve.",
    error: "❌ Ocorreu um erro. Por favor tente novamente.",
    agreeText: "Li e concordo com a",
    privacy: "Política de Privacidade"
  },
  EN: {
    title: "Subscribe to our Newsletter",
    description: "Stay up to date with the latest news, sustainable innovations, and international exhibitions from Curtumes Ibéria.",
    placeholder: "Your best email address",
    button: "Subscribe Now",
    success: "✅ Thank you for subscribing! Check your inbox soon.",
    error: "❌ An error occurred. Please try again.",
    agreeText: "I have read and agree to the",
    privacy: "Privacy Policy"
  }
};

export function Newsletter() {
  const { language } = useLanguage();
  const data = content[language];
  
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !acceptedTerms) return;
    
    setStatus('submitting');
    
    try {
      // Chamada real ao teu backend Node.js
      const response = await fetch('https://curtumes-backend.onrender.com/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Falha na subscrição');
      }

      setStatus('success');
      setEmail('');
      setAcceptedTerms(false);
      
      // Voltar ao estado inicial após uns segundos
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-24 md:py-32 border-t border-gray-100 overflow-hidden">
      
      {/* Elementos Gráficos de Fundo para quebrar a "secura" */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40">
        <div className="w-[800px] h-[800px] bg-institucional-blue/5 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <svg className="absolute -right-20 bottom-0 w-96 h-96 text-institucional-blue/5 -rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.1,-55.4,78.2,-41.1C87.3,-26.8,95.3,-12.1,94.2,2C93.1,16.1,82.8,29.6,72.4,41.4C62,53.2,51.5,63.3,39,70.5C26.5,77.7,11.9,82,-3.1,87C-18.1,92,-33.5,77.7,-46.8,68.2C-60.1,58.7,-71.3,44.1,-77.6,28.1C-83.9,12.1,-85.3,-5.3,-79.8,-20.1C-74.3,-34.9,-61.9,-47.1,-48.5,-54.6C-35.1,-62.1,-20.7,-64.9,-4.9,-56.9C10.9,-48.9,21.8,-30.1,32.4,-83.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-blue-50 text-center"
        >
          {/* Ícone Decorativo */}
          <div className="w-16 h-16 bg-blue-50 text-institucional-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="font-title font-bold text-3xl md:text-5xl text-institucional-blue mb-6 tracking-tight">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 border border-green-200 text-green-700 font-bold text-lg p-6 rounded-2xl max-w-2xl mx-auto"
              >
                {data.success}
              </motion.div>
            ) : status === 'error' ? (
               <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-red-50 border border-red-200 text-red-700 font-bold text-lg p-6 rounded-2xl max-w-2xl mx-auto"
              >
                {data.error}
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="max-w-2xl mx-auto flex flex-col gap-6"
              >
                {/* Inputs Maiores e Destacados */}
                <div className="flex flex-col sm:flex-row gap-4 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={data.placeholder}
                    required
                    className="flex-1 px-6 py-4 md:py-5 text-lg bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-institucional-blue/20 focus:border-institucional-blue focus:bg-white transition-all shadow-sm"
                    disabled={status === 'submitting'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !acceptedTerms}
                    className="bg-institucional-blue text-white px-8 py-4 md:py-5 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg min-w-[200px]"
                  >
                    {status === 'submitting' ? '...' : data.button}
                  </button>
                </div>

                {/* Checkbox de Confirmação RGPD */}
                <label className="flex items-start sm:items-center justify-center gap-3 cursor-pointer group mt-2">
                  <div className="relative flex items-center mt-1 sm:mt-0">
                    <input 
                      type="checkbox" 
                      required 
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      disabled={status === 'submitting'}
                      className="w-5 h-5 md:w-6 md:h-6 appearance-none border-2 border-gray-300 rounded-md checked:bg-institucional-blue checked:border-institucional-blue focus:ring-2 focus:ring-institucional-blue/30 focus:outline-none transition-colors cursor-pointer peer"
                    />
                    {/* SVG do Check personalizado */}
                    <svg className="absolute w-4 h-4 md:w-5 md:h-5 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base text-gray-600 font-medium text-left sm:text-center select-none group-hover:text-gray-900 transition-colors">
                    {data.agreeText} {' '}
                    <Link to="/politica-privacidade" className="text-institucional-blue hover:text-blue-800 underline underline-offset-2 transition-colors">
                      {data.privacy}
                    </Link>
                    
                  </span>
                </label>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}