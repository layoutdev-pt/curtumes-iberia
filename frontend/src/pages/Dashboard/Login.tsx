// Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const content = {
  PT: {
    title: "Painel Restrito",
    subtitle: "Acesso exclusivo à equipa de administração.",
    emailLabel: "E-mail corporativo",
    passwordLabel: "Palavra-passe",
    loadingBtn: "A verificar...",
    submitBtn: "Iniciar Sessão Segura",
    errorMsg: "Credenciais inválidas. Verifique os dados de acesso."
  },
  EN: {
    title: "Restricted Panel",
    subtitle: "Exclusive access for the administration team.",
    emailLabel: "Corporate e-mail",
    passwordLabel: "Password",
    loadingBtn: "Verifying...",
    submitBtn: "Secure Login",
    errorMsg: "Invalid credentials. Please check your access data."
  }
};

export function Login() {
  const { language } = useLanguage();
  const data = content[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(data.errorMsg);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-institucional-blue/5 skew-x-12 translate-x-1/4"></div>
      
      <div className="max-w-md w-full relative z-10 px-4">
        <div className="text-center mb-10">
          <img src="/logos/Icone_CoresOriginais_FundoBranco_copy.svg" alt="Logo" className="h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-title font-bold text-institucional-blue">{data.title}</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">{data.subtitle}</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,40,88,0.1)] border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3.5 rounded-lg text-sm text-center border border-red-100 font-title font-bold tracking-wider">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-title font-bold text-gray-500 uppercase tracking-wider mb-2">{data.emailLabel}</label>
                <input
                  type="email" required
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-title font-bold text-gray-500 uppercase tracking-wider mb-2">{data.passwordLabel}</label>
                <input
                  type="password" required
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-institucional-blue/20 focus:border-institucional-blue outline-none transition-all text-sm font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className={`w-full flex justify-center py-3.5 px-4 rounded-lg text-sm font-title font-bold uppercase tracking-wider text-white shadow-md transition-all ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-institucional-blue hover:bg-blue-900 hover:-translate-y-0.5'
              }`}
            >
              {loading ? data.loadingBtn : data.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}