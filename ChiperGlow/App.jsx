import { useState } from 'react';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('caesar');
  const [encryptedText, setEncryptedText] = useState('');

  // Caesar Cipher Encryption (Shifts letters by 3)
  const caesarCipher = (text, shift = 3) => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  };

  // Simplified MD5-like hashing (mock version for demo)
  const md5Hash = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const chr = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash.toString(16).padStart(8, '0');
  };

  // Simple SHA-1 mock (for demonstration only)
  const sha1Hash = (text) => {
    let hash = '';
    for (let i = 0; i < text.length; i++) {
      hash += text.charCodeAt(i).toString(16);
    }
    return hash.substr(0, 40);
  };

  const encrypt = () => {
    let result = '';
    switch (selectedAlgorithm) {
      case 'caesar':
        result = caesarCipher(inputText);
        break;
      case 'md5':
        result = md5Hash(inputText);
        break;
      case 'sha1':
        result = sha1Hash(inputText);
        break;
      default:
        result = inputText;
    }
    setEncryptedText(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <header className="py-12 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          ChiperGlow
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Encrypt and secure your data with various encryption algorithms.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Form */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700 transition-transform hover:scale-[1.01] duration-300">
          <h2 className="text-2xl font-semibold mb-6">Enter Text</h2>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={6}
            className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-6">
            <label htmlFor="algorithm" className="block text-sm font-medium mb-2">
              Choose Algorithm
            </label>
            <select
              id="algorithm"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="caesar">Caesar Cipher</option>
              <option value="md5">MD5 Hash</option>
              <option value="sha1">SHA-1 Hash</option>
            </select>
          </div>

          <button
            onClick={encrypt}
            disabled={!inputText.trim()}
            className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
              inputText.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Encrypt
          </button>
        </div>

        {/* Output Result */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700 transition-transform hover:scale-[1.01] duration-300">
          <h2 className="text-2xl font-semibold mb-6">Encrypted Result</h2>

          <div className="relative">
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-200 min-h-[150px] whitespace-pre-wrap break-words">
              {encryptedText || 'Your encrypted output will appear here...'}
            </pre>

            {encryptedText && (
              <button
                onClick={() => navigator.clipboard.writeText(encryptedText)}
                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                </svg>
              </button>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{inputText.length}</div>
              <div className="text-sm text-gray-400">Characters</div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{inputText.split(/\s+/).filter(Boolean).length}</div>
              <div className="text-sm text-gray-400">Words</div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{selectedAlgorithm.toUpperCase()}</div>
              <div className="text-sm text-gray-400">Method</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Available Algorithms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2 text-blue-500">🔒</span> Caesar Cipher
              </h3>
              <p className="text-gray-400">
                A substitution cipher where each letter is shifted a certain number of positions down the alphabet.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2 text-purple-500">🧮</span> MD5 Hash
              </h3>
              <p className="text-gray-400">
                A widely used cryptographic hash function that produces a 128-bit (16-byte) hash value.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2 text-green-500">🔐</span> SHA-1 Hash
              </h3>
              <p className="text-gray-400">
                A cryptographic hash function which takes an input and produces a 160-bit (20-byte) hash value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-500 border-t border-gray-800 mt-12">
        <p>© {new Date().getFullYear()} ChiperGlow</p>
      </footer>
    </div>
  );
}