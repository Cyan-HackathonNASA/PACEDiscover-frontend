import React from 'react';

const ControlPanel = ({ onTextureChange, onOpacityChange, textures, selectedTexture, opacity }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-gray-800 text-white p-4 shadow-lg z-50">
      <h2 className="text-2xl font-bold mb-6">Controls</h2>
      
      {/* Dropdown para seleção de textura */}
      <div className="mb-4">
        <label className="block mb-2">Select Texture</label>
        <select
          value={selectedTexture}
          onChange={(e) => onTextureChange(e.target.value)}
          className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {textures.map((texture, index) => (
            <option key={index} value={texture.value}>
              {texture.label}
            </option>
          ))}
        </select>
      </div>

      {/* Slider para opacidade */}
      <div className="mb-4">
        <label className="block mb-2">Texture Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
          className="w-full"
        />
        <span className="block text-sm mt-1">{opacity}</span>
      </div>

      {/* Espaço para mais controles */}
      <div className="mt-6">
        <p className="text-sm">Add more controls as needed...</p>
      </div>
    </div>
  );
};

export default ControlPanel;
