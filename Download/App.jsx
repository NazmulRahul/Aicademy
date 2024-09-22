import React, { useState } from 'react';
import Text from './Text';
import Image from './Image';
import Notes from './Notes';
import Down from './Down'

const App = () => {
  const [activeTab, setActiveTab] = useState('text');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <h1>Content Display</h1>
      <div>
        <button onClick={() => handleTabClick('text')}>Text</button>
        <button onClick={() => handleTabClick('images')}>Images</button>
        <button onClick={() => handleTabClick('notes')}>Notes</button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'text' && (<Text/>)}
        
        {activeTab === 'images' && (<Image/>)}
        
        {activeTab === 'notes' && (<Notes/>)}
      </div>

    </div>
  );
};

export default App;
