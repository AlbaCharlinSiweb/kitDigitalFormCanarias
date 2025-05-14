import { useState } from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Completion from './components/Completion';
import SponsorsBar from './components/SponsorsBar';
import Footer from './components/Footer';

function App() {
  const [showCompletion, setShowCompletion] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {showCompletion ? (
        <Completion />
      ) : (
        <main className="flex-grow bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12">
          <div className="px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <Form onComplete={() => setShowCompletion(true)} />
            </div>
          </div>
        </main>
      )}
      
      <SponsorsBar />
      <Footer />
    </div>
  );
}

export default App;