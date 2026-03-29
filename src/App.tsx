/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import {
  LayoutGrid, Palette, Layers, FolderOpen, HelpCircle, MessageSquare,
  Type, AlignLeft, Image as ImageIcon, PlayCircle, MousePointer2, TextCursorInput,
  Undo, Redo, Monitor, Smartphone, Tablet, Eye, Settings, Bell, Search,
  Plus, MoreVertical, X, Upload, Grid3X3, Square, Space, Moon, Sun
} from 'lucide-react';

// --- Types ---
type BlockType = 'heading' | 'paragraph' | 'image' | 'note';

interface BlockStyle {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  backgroundColor: string;
  borderRadius: string;
  textAlign: 'left' | 'center' | 'right';
  padding: number;
}

interface Block {
  id: string;
  type: BlockType;
  content: string;
  src?: string;
  styles: BlockStyle;
}

const defaultStyles: BlockStyle = {
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: 0,
  color: '#1a1c1e',
  backgroundColor: 'transparent',
  borderRadius: 'none',
  textAlign: 'left',
  padding: 0,
};

// --- Mock Data ---
const initialBlocks: Block[] = [
  {
    id: '1',
    type: 'heading',
    content: 'The Quiet Power of Minimal Form.',
    styles: { ...defaultStyles, fontSize: 64, fontWeight: '800', lineHeight: 1.1, letterSpacing: -0.02, textAlign: 'center' }
  },
  {
    id: '2',
    type: 'paragraph',
    content: 'Exploring the intersection of brutalist geometry and organic textures in modern residential design.',
    styles: { ...defaultStyles, fontSize: 20, color: '#414753', textAlign: 'center', padding: 16 }
  },
  {
    id: '3',
    type: 'image',
    content: 'Hero Image',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    styles: { ...defaultStyles, borderRadius: 'xl' }
  },
  {
    id: '4',
    type: 'note',
    content: 'Architecture is the learned game, correct and magnificent, of forms assembled in the light.',
    styles: { ...defaultStyles, backgroundColor: '#f3f3f6', padding: 24, borderRadius: 'lg', fontFamily: 'Playfair Display' }
  }
];

const initialMediaAssets = [
  { id: 'm1', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', name: 'exterior-view.jpg', type: 'IMG' },
  { id: 'm2', src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', name: 'interior-living.jpg', type: 'IMG' },
  { id: 'm3', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', name: 'modern-kitchen.jpg', type: 'IMG' },
  { id: 'm4', src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', name: 'office-building.jpg', type: 'IMG' },
];

const predefinedTemplates = [
  {
    id: 't1',
    name: 'Aplicativo de meditação para jovens',
    blocks: [
      {
        id: 'b1',
        type: 'heading' as BlockType,
        content: 'Respire fundo. Relaxe.',
        styles: { ...defaultStyles, fontSize: 48, fontWeight: '700', color: '#6d28d9', textAlign: 'center', fontFamily: 'Inter' }
      },
      {
        id: 'b2',
        type: 'paragraph' as BlockType,
        content: 'Encontre sua paz interior com meditações guiadas feitas para você.',
        styles: { ...defaultStyles, fontSize: 18, color: '#4c1d95', textAlign: 'center', padding: 16 }
      },
      {
        id: 'b3',
        type: 'image' as BlockType,
        content: 'Image',
        src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        styles: { ...defaultStyles, borderRadius: '2xl' }
      }
    ]
  },
  {
    id: 't2',
    name: 'Loja online de roupas de luxo',
    blocks: [
      {
        id: 'b1',
        type: 'heading' as BlockType,
        content: 'Elegância Redefinida.',
        styles: { ...defaultStyles, fontSize: 56, fontWeight: '400', color: '#171717', textAlign: 'center', fontFamily: 'Playfair Display', letterSpacing: 0.05 }
      },
      {
        id: 'b2',
        type: 'image' as BlockType,
        content: 'Image',
        src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        styles: { ...defaultStyles, borderRadius: 'none' }
      },
      {
        id: 'b3',
        type: 'paragraph' as BlockType,
        content: 'Descubra a nova coleção de outono. Peças exclusivas para quem exige o melhor.',
        styles: { ...defaultStyles, fontSize: 16, color: '#525252', textAlign: 'center', padding: 32, fontFamily: 'Inter' }
      }
    ]
  },
  {
    id: 't3',
    name: 'Blog de receitas veganas',
    blocks: [
      {
        id: 'b1',
        type: 'heading' as BlockType,
        content: 'Sabor 100% Vegetal',
        styles: { ...defaultStyles, fontSize: 42, fontWeight: '800', color: '#166534', textAlign: 'left', fontFamily: 'Inter' }
      },
      {
        id: 'b2',
        type: 'paragraph' as BlockType,
        content: 'Receitas fáceis, deliciosas e livres de crueldade para o seu dia a dia.',
        styles: { ...defaultStyles, fontSize: 18, color: '#15803d', textAlign: 'left', padding: 16 }
      },
      {
        id: 'b3',
        type: 'image' as BlockType,
        content: 'Image',
        src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        styles: { ...defaultStyles, borderRadius: 'xl' }
      }
    ]
  }
];

export default function App() {
  const [activeView, setActiveView] = useState<'editor' | 'templates'>('editor');
  const [savedTemplates, setSavedTemplates] = useState<{id: string, name: string, blocks: Block[]}[]>(predefinedTemplates);
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [assets, setAssets] = useState(initialMediaAssets);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const selectedBlock = blocks.find(b => b.id === selectedId);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: type === 'heading' ? 'New Heading' : type === 'paragraph' ? 'New paragraph text...' : type === 'note' ? 'Important note here.' : 'Image Placeholder',
      src: type === 'image' ? 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' : undefined,
      styles: { ...defaultStyles, fontSize: type === 'heading' ? 40 : 16 }
    };
    setBlocks([...blocks, newBlock]);
    setSelectedId(newBlock.id);
  };

  const updateBlockStyle = (key: keyof BlockStyle, value: any) => {
    if (!selectedId) return;
    setBlocks(blocks.map(b => b.id === selectedId ? { ...b, styles: { ...b.styles, [key]: value } } : b));
  };

  const updateBlockContent = (content: string) => {
    if (!selectedId) return;
    setBlocks(blocks.map(b => b.id === selectedId ? { ...b, content } : b));
  };

  const replaceImage = (src: string) => {
    if (!selectedId) return;
    setBlocks(blocks.map(b => b.id === selectedId ? { ...b, src } : b));
    setIsMediaLibraryOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newAsset = {
        id: 'm' + Date.now(),
        src: url,
        name: file.name,
        type: 'IMG'
      };
      setAssets([newAsset, ...assets]);
    }
  };

  const saveAsTemplate = () => {
    const name = prompt('Nome do template:');
    if (name) {
      setSavedTemplates([...savedTemplates, { id: 't' + Date.now(), name, blocks: [...blocks] }]);
      alert('Template salvo com sucesso!');
    }
  };

  const loadTemplate = (templateBlocks: Block[]) => {
    setBlocks(templateBlocks);
    setActiveView('editor');
  };

  return (
    <div className="flex h-screen bg-surface dark:bg-slate-900 text-on-surface dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">
      
      {/* --- Top Navbar --- */}
      <header className="fixed top-0 w-full z-50 px-6 flex justify-between items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md h-14 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-primary dark:text-blue-400">Architectural Editor</span>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => setActiveView('editor')} className={`transition-colors ${activeView === 'editor' ? 'text-primary border-b-2 border-primary pb-4 pt-4' : 'text-slate-500 dark:text-slate-400 hover:text-primary pt-4 pb-4'}`}>Editor</button>
            <button onClick={() => setActiveView('templates')} className={`transition-colors ${activeView === 'templates' ? 'text-primary border-b-2 border-primary pb-4 pt-4' : 'text-slate-500 dark:text-slate-400 hover:text-primary pt-4 pb-4'}`}>Templates</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-500 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 text-slate-500 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><Bell size={20} /></button>
          <button className="p-2 text-slate-500 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><Settings size={20} /></button>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 dark:border-slate-700">
            <img src="https://i.pravatar.cc/150?img=68" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* --- Floating Canvas Tools --- */}
      {activeView === 'editor' && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 flex gap-4 items-center rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2">
            <button className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><Undo size={18} /></button>
            <button className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><Redo size={18} /></button>
          </div>
          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2">
            <button className="p-1.5 text-primary bg-primary/10 rounded-full"><Monitor size={18} /></button>
            <button className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><Tablet size={18} /></button>
            <button className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><Smartphone size={18} /></button>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <button onClick={saveAsTemplate} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary">Save as Template</button>
            <button className="text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-full shadow-md hover:bg-primary-container transition-colors">Publish</button>
          </div>
        </div>
      )}

      {/* --- Left Sidebar (Elements) --- */}
      {activeView === 'editor' && (
      <aside className="w-64 h-full pt-14 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 z-30">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Editor</h2>
          <p className="text-[10px] text-primary font-bold">v2.4.0</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Typography</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => addBlock('heading')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group">
                <Type size={20} className="text-slate-400 group-hover:text-primary mb-1" />
                <span className="text-[11px] font-medium">Heading</span>
              </button>
              <button onClick={() => addBlock('paragraph')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group">
                <AlignLeft size={20} className="text-slate-400 group-hover:text-primary mb-1" />
                <span className="text-[11px] font-medium">Paragraph</span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Media</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => addBlock('image')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group">
                <ImageIcon size={20} className="text-slate-400 group-hover:text-primary mb-1" />
                <span className="text-[11px] font-medium">Image</span>
              </button>
              <button onClick={() => addBlock('note')} className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group">
                <TextCursorInput size={20} className="text-slate-400 group-hover:text-primary mb-1" />
                <span className="text-[11px] font-medium">Note Block</span>
              </button>
            </div>
          </div>

        </nav>
      </aside>
      )}

      {/* --- Main Canvas or Templates --- */}
      {activeView === 'templates' ? (
        <main className="flex-1 pt-24 pb-12 px-8 overflow-y-auto bg-surface-container-low dark:bg-slate-900 scrollbar-hide relative">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Templates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTemplates.map(template => (
                <div key={template.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer" onClick={() => loadTemplate(template.blocks)}>
                  <div className="h-48 bg-slate-100 dark:bg-slate-900 p-4 overflow-hidden relative">
                     <div className="transform scale-[0.25] origin-top-left w-[400%] pointer-events-none">
                       {template.blocks.slice(0, 3).map((block: any) => {
                         const s = block.styles;
                         const inlineStyles: React.CSSProperties = {
                           fontFamily: s.fontFamily,
                           fontWeight: s.fontWeight,
                           fontSize: `${s.fontSize}px`,
                           lineHeight: s.lineHeight,
                           letterSpacing: `${s.letterSpacing}em`,
                           color: s.color,
                           backgroundColor: s.backgroundColor !== 'transparent' ? s.backgroundColor : undefined,
                           textAlign: s.textAlign,
                           padding: `${s.padding}px`,
                           borderRadius: s.borderRadius === 'none' ? 0 : s.borderRadius === 'sm' ? '0.25rem' : s.borderRadius === 'lg' ? '0.5rem' : s.borderRadius === 'xl' ? '0.75rem' : '1rem',
                           marginBottom: '1rem'
                         };
                         return (
                          <div key={block.id} style={inlineStyles}>
                            {block.type === 'image' ? <img src={block.src} className="w-full h-auto object-cover" style={{ borderRadius: inlineStyles.borderRadius }} /> : block.content}
                          </div>
                         );
                       })}
                     </div>
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                       <span className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">Usar Template</span>
                     </div>
                  </div>
                  <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white">{template.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{template.blocks.length} blocos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
      <main className="flex-1 pt-24 pb-12 px-8 overflow-y-auto bg-surface-container-low dark:bg-slate-900 scrollbar-hide relative" onClick={() => setSelectedId(null)}>
        <div className="max-w-4xl mx-auto min-h-[800px] bg-white dark:bg-slate-950 canvas-shadow rounded-xl p-16 relative transition-colors duration-200" onClick={(e) => e.stopPropagation()}>
          
          {blocks.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <Plus size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Add blocks from the sidebar to start building.</p>
            </div>
          )}

          <div className="space-y-4">
            {blocks.map((block) => {
              const isSelected = block.id === selectedId;
              const s = block.styles;
              
              const commonClasses = `relative group cursor-pointer border-2 transition-all duration-200 ${isSelected ? 'border-primary' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'}`;
              
              const inlineStyles: React.CSSProperties = {
                fontFamily: s.fontFamily,
                fontWeight: s.fontWeight,
                fontSize: `${s.fontSize}px`,
                lineHeight: s.lineHeight,
                letterSpacing: `${s.letterSpacing}em`,
                color: s.color,
                backgroundColor: s.backgroundColor !== 'transparent' ? s.backgroundColor : undefined,
                textAlign: s.textAlign,
                padding: `${s.padding}px`,
                borderRadius: s.borderRadius === 'none' ? 0 : s.borderRadius === 'sm' ? '0.25rem' : s.borderRadius === 'lg' ? '0.5rem' : s.borderRadius === 'xl' ? '0.75rem' : '1rem',
              };

              return (
                <div 
                  key={block.id} 
                  className={commonClasses}
                  onClick={() => setSelectedId(block.id)}
                >
                  {isSelected && (
                    <div className="absolute -top-3 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest z-10 shadow-sm">
                      {block.type}
                    </div>
                  )}
                  
                  {block.type === 'heading' || block.type === 'paragraph' || block.type === 'note' ? (
                    <div style={inlineStyles} className="w-full outline-none" contentEditable suppressContentEditableWarning onBlur={(e) => updateBlockContent(e.currentTarget.textContent || '')}>
                      {block.content}
                    </div>
                  ) : block.type === 'image' ? (
                    <div className="relative w-full overflow-hidden" style={{ borderRadius: inlineStyles.borderRadius }}>
                      <img src={block.src} alt="Block" className="w-full h-auto object-cover" />
                      {isSelected && (
                        <button 
                          onClick={() => setIsMediaLibraryOpen(true)}
                          className="absolute top-4 right-4 bg-white/90 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2 hover:bg-white"
                        >
                          <ImageIcon size={14} /> Replace Image
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      )}

      {/* --- Right Sidebar (Properties) --- */}
      {activeView === 'editor' && selectedBlock && (
        <aside className="w-80 h-full pt-14 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto scrollbar-hide z-30 shadow-xl">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Style & Typography</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Editing {selectedBlock.type}</p>
            </div>
            <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400"><X size={16}/></button>
          </div>

          <div className="p-5 space-y-6">
            
            {/* Typography Controls (for text blocks) */}
            {(selectedBlock.type === 'heading' || selectedBlock.type === 'paragraph' || selectedBlock.type === 'note') && (
              <>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Font Family</label>
                  <select 
                    value={selectedBlock.styles.fontFamily}
                    onChange={(e) => updateBlockStyle('fontFamily', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                  >
                    <option value="Inter">Inter (Sans)</option>
                    <option value="Playfair Display">Playfair Display (Serif)</option>
                    <option value="Roboto Mono">Roboto Mono (Monospace)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight</label>
                    <select 
                      value={selectedBlock.styles.fontWeight}
                      onChange={(e) => updateBlockStyle('fontWeight', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                    >
                      <option value="400">Regular</option>
                      <option value="500">Medium</option>
                      <option value="700">Bold</option>
                      <option value="800">Extra Bold</option>
                      <option value="900">Black</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size (px)</label>
                    <input 
                      type="number" 
                      value={selectedBlock.styles.fontSize}
                      onChange={(e) => updateBlockStyle('fontSize', parseInt(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Line Height</label>
                      <span className="text-[10px] font-bold text-primary">{selectedBlock.styles.lineHeight}</span>
                    </div>
                    <input 
                      type="range" min="0.8" max="2.5" step="0.1" 
                      value={selectedBlock.styles.lineHeight}
                      onChange={(e) => updateBlockStyle('lineHeight', parseFloat(e.target.value))}
                      className="w-full accent-primary h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Letter Spacing</label>
                      <span className="text-[10px] font-bold text-primary">{selectedBlock.styles.letterSpacing}</span>
                    </div>
                    <input 
                      type="range" min="-0.1" max="0.5" step="0.01" 
                      value={selectedBlock.styles.letterSpacing}
                      onChange={(e) => updateBlockStyle('letterSpacing', parseFloat(e.target.value))}
                      className="w-full accent-primary h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alignment</label>
                  <div className="flex bg-slate-50 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                    {['left', 'center', 'right'].map((align) => (
                      <button 
                        key={align}
                        onClick={() => updateBlockStyle('textAlign', align)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded capitalize ${selectedBlock.styles.textAlign === align ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Colors */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Colors</label>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold dark:text-slate-300">Text Color</span>
                <input 
                  type="color" 
                  value={selectedBlock.styles.color}
                  onChange={(e) => updateBlockStyle('color', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold dark:text-slate-300">Background</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateBlockStyle('backgroundColor', 'transparent')} className="text-[10px] text-slate-400 hover:text-primary">Clear</button>
                  <input 
                    type="color" 
                    value={selectedBlock.styles.backgroundColor === 'transparent' ? '#ffffff' : selectedBlock.styles.backgroundColor}
                    onChange={(e) => updateBlockStyle('backgroundColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Spacing & Borders */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Box Model</label>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-semibold dark:text-slate-300">Padding</span>
                  <span className="text-[10px] font-bold text-primary">{selectedBlock.styles.padding}px</span>
                </div>
                <input 
                  type="range" min="0" max="128" step="4" 
                  value={selectedBlock.styles.padding}
                  onChange={(e) => updateBlockStyle('padding', parseInt(e.target.value))}
                  className="w-full accent-primary h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none"
                />
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold dark:text-slate-300">Border Radius</span>
                <div className="flex gap-2">
                  {['none', 'sm', 'lg', 'xl', '2xl'].map((rad) => (
                    <button 
                      key={rad}
                      onClick={() => updateBlockStyle('borderRadius', rad)}
                      className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded border ${selectedBlock.styles.borderRadius === rad ? 'bg-primary text-white border-primary' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                    >
                      {rad}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
               <button onClick={() => setBlocks(blocks.filter(b => b.id !== selectedId))} className="w-full py-2.5 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                 Delete Block
               </button>
            </div>

          </div>
        </aside>
      )}

      {/* --- Media Library Modal --- */}
      {isMediaLibraryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border border-slate-200 dark:border-slate-800">
            
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Media Library</h2>
                <p className="text-sm text-slate-500">Select an image to insert</p>
              </div>
              <button onClick={() => setIsMediaLibraryOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-6 flex gap-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search assets..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none dark:text-white" />
              </div>
              <label className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors cursor-pointer">
                <Upload size={16} /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-4">
                {assets.map(asset => (
                  <div 
                    key={asset.id} 
                    onClick={() => replaceImage(asset.src)}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary hover:shadow-lg transition-all relative aspect-video bg-slate-100 dark:bg-slate-800"
                  >
                    <img src={asset.src} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">Select Image</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
