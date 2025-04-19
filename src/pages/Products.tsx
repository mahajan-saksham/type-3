import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Battery, 
  Shield,
  SlidersHorizontal,
  Search,
  ChevronDown,
  HomeIcon,
  Zap,
  CircleDollarSign,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  ArrowUpRight,
  StarIcon,
  Power,
  CircuitBoard,
  Fence,
  Lightbulb,
  Droplet,
  PanelTop,
  Blocks
} from 'lucide-react';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { supabase } from '../lib/supabaseClient';
import { SiteVisitForm } from '../components/SiteVisitForm';

interface Product {
  id: string;
  name: string;
  capacity_kw: number;
  generation: string;
  area_required: number;
  monthly_savings: number;
  subsidy_amount: number;
  price: number;
  panel_type: string;
  image_url: string;
  features: string[];
  description: string;
  category: string;
  sku: string;
  original_price?: number;
  installation_time?: string;
  specifications?: Record<string, any>;
  inventory_count?: number;
}

interface Filters {
  capacity: [number, number];
  price: [number, number];
  panelType: 'all' | 'monocrystalline' | 'polycrystalline';
  area: [number, number];
}

type SortOption = 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc';
type CategoryFilter = 'on-grid' | 'off-grid' | 'hybrid' | 'fencing' | 'lighting' | 'water_heating' | 'water_pumping' | 'rock_lighting';

export default function Products() {
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [siteVisitProduct, setSiteVisitProduct] = useState<{sku: string, name: string, power: number} | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    capacity: [0, 20],
    price: [0, 1000000],
    panelType: 'all',
    area: [0, 2000]
  });
  const [sortBy, setSortBy] = useState<SortOption>('capacity-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('on-grid');
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('product_skus')
          .select('*')
          .order('capacity_kw', { ascending: true });
        
        if (error) throw error;
        
        const transformedProducts = data.map((product: any) => ({
          ...product,
          features: Array.isArray(product.features) 
            ? product.features 
            : (typeof product.features === 'string' 
                ? JSON.parse(product.features) 
                : product.features || []),
          specifications: typeof product.specifications === 'string' 
            ? JSON.parse(product.specifications) 
            : product.specifications || {}
        }));
        
        setProducts(transformedProducts);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    // Only apply basic validation for required fields
    if (!product || !product.name) {
      return false;
    }

    // Only apply search filter if search is active
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Only category should be a hard filter, everything else is optional
    const matchesCategory = product.category === selectedCategory;

    // Everything else passes by default - we'll show all products
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'capacity-asc':
        return a.capacity_kw - b.capacity_kw;
      case 'capacity-desc':
        return b.capacity_kw - a.capacity_kw;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleBuyClick = (product: Product) => {
    setSiteVisitProduct({
      sku: product.sku,
      name: product.name,
      power: product.capacity_kw
    });
    setIsSiteVisitModalOpen(true);
  };

  const handleCloseSiteVisit = () => {
    setIsSiteVisitModalOpen(false);
    setSiteVisitProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      
      {/* Category Navigation - Apple Style */}
      <motion.section 
        className={`sticky top-0 z-30 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300 mt-20 ${isScrolled ? 'py-3' : 'py-6'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'on-grid', name: 'On-Grid Systems', icon: <Zap size={16} /> },
              { id: 'off-grid', name: 'Off-Grid Systems', icon: <Power size={16} /> },
              { id: 'hybrid', name: 'Hybrid Systems', icon: <CircuitBoard size={16} /> },
              { id: 'fencing', name: 'Fencing Systems', icon: <Fence size={16} /> },
              { id: 'lighting', name: 'Street Lights', icon: <Lightbulb size={16} /> },
              { id: 'water_heating', name: 'Water Heaters', icon: <Droplet size={16} /> },
              { id: 'water_pumping', name: 'Water Pumps', icon: <PanelTop size={16} /> },
              { id: 'rock_lighting', name: 'Rock Lights', icon: <Blocks size={16} /> }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as CategoryFilter)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-dark font-medium' 
                    : 'bg-dark-800/50 text-light/70 hover:bg-dark-700/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="">{category.icon}</span>
                  <span>{category.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Products Grid - Apple Style */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Section Heading */}
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {selectedCategory === 'all' ? 'All Products' : 
                 `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}${['panels', 'inverters', 'batteries', 'mounting', 'accessories', 'packages'].includes(selectedCategory) ? '' : ' Systems'}`}
              </span>
            </h2>
            <p className="text-light/70 max-w-2xl mx-auto">
              {selectedCategory === 'all' 
                ? 'Browse our complete collection of premium solar systems tailored for various needs.'
                : selectedCategory === 'on-grid'
                  ? 'Specially designed for homes, maximizing energy production with minimal roof space.'
                  : selectedCategory === 'off-grid'
                    ? 'High-capacity systems for businesses looking to reduce operational costs.'
                    : selectedCategory === 'hybrid'
                      ? 'Industrial-grade solar systems for large-scale facilities and manufacturing plants.'
                      : selectedCategory === 'fencing'
                        ? 'Specially designed for homes, maximizing energy production with minimal roof space.'
                        : selectedCategory === 'lighting'
                          ? 'High-capacity systems for businesses looking to reduce operational costs.'
                          : selectedCategory === 'water_heating'
                            ? 'Industrial-grade solar systems for large-scale facilities and manufacturing plants.'
                            : selectedCategory === 'water_pumping'
                              ? 'Specially designed for homes, maximizing energy production with minimal roof space.'
                              : 'High-capacity systems for businesses looking to reduce operational costs.'}
            </p>
          </motion.div>
          
          {/* Apple-style Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="group h-full flex flex-col bg-dark-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                  {/* Product Image - Larger, Apple-style */}
                  <div className="relative h-[300px] overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/80"></div>
                    <div className="absolute top-4 right-4 bg-dark-900/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border border-white/10">
                      {product.capacity_kw} kW
                    </div>
                  </div>
                  
                  {/* Product Info - Clean, Minimal */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-light group-hover:text-primary transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-light/60 text-sm mb-6 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Key Specs - Apple Style Line Design */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <Sun size={16} className="text-primary/80" />
                          <div className="flex flex-1 justify-between border-b border-white/5 pb-1">
                            <span className="text-light/80 text-sm">Generation</span>
                            <span className="text-sm font-medium">{product.generation || 'N/A'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Battery size={16} className="text-primary/80" />
                          <div className="flex flex-1 justify-between border-b border-white/5 pb-1">
                            <span className="text-light/80 text-sm">Savings</span>
                            <span className="text-sm font-medium">₹{product.monthly_savings || 'N/A'}/mo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
                      <div>
                        <p className="text-xs text-light/50">From</p>
                        <p className="text-2xl font-medium text-light">₹{(product.price - (product.subsidy_amount || 0)).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => handleBuyClick(product)}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-300 group/btn bg-primary/5 hover:bg-primary/10 px-3 py-2 rounded-full"
                      >
                        <span>Buy</span>
                        <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl text-light/60"
              >
                No products match your current filters.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-primary hover:text-primary/80 underline"
                onClick={() => {
                  setFilters({
                    capacity: [0, 20],
                    price: [0, 1000000],
                    panelType: 'all',
                    area: [0, 2000]
                  });
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </motion.button>
            </div>
          )}
        </div>
      </section>
      
      {/* Product Details Modal - Apple Style */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="container mx-auto px-6 py-24"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content - Apple Aesthetic */}
              {products.find(p => p.id === selectedProduct) && (
                <div className="bg-dark-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 max-w-5xl mx-auto">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-8 right-8 z-50 bg-dark-800/50 backdrop-blur-sm p-2 rounded-full border border-white/10 text-light/60 hover:text-primary transition-colors duration-300"
                  >
                    <X size={24} />
                  </button>
                  
                  <div className="grid md:grid-cols-2">
                    {/* Product Image - Large Display */}
                    <div className="relative h-[400px] md:h-full overflow-hidden">
                      <img
                        src={products.find(p => p.id === selectedProduct)?.image_url}
                        alt={products.find(p => p.id === selectedProduct)?.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark/80 md:bg-gradient-to-l"></div>
                    </div>
                    
                    {/* Product Details - Clean Typography */}
                    <div className="p-10 relative">
                      <div className="space-y-6 h-full flex flex-col">
                        <div>
                          <h2 className="text-3xl font-bold text-primary mb-2">
                            {products.find(p => p.id === selectedProduct)?.name}
                          </h2>
                          <p className="text-light/80 text-lg mb-6">
                            {products.find(p => p.id === selectedProduct)?.description}
                          </p>
                        </div>
                        
                        {/* Apple-style feature highlights with icons */}
                        <div className="space-y-6 mb-8">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Sun size={24} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Premium {products.find(p => p.id === selectedProduct)?.capacity_kw}kW System</h4>
                              <p className="text-light/70 text-sm">Delivers consistent power output in all weather conditions</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Battery size={24} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Generates {products.find(p => p.id === selectedProduct)?.generation} Daily</h4>
                              <p className="text-light/70 text-sm">Significantly reduce or eliminate your electricity bills</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <CircleDollarSign size={24} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">₹{products.find(p => p.id === selectedProduct)?.monthly_savings}/mo Savings</h4>
                              <p className="text-light/70 text-sm">Return on investment within 4-6 years, then pure savings</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Key Features - Apple Style List */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold mb-4 text-light">In the Box</h3>
                          <ul className="space-y-3">
                            {products.find(p => p.id === selectedProduct)?.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                                <span className="text-light/80">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Technical Specifications */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold mb-4 text-light">Tech Specs</h3>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-primary/80 mb-1">Capacity</p>
                              <p className="text-base">{products.find(p => p.id === selectedProduct)?.capacity_kw} kW</p>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-primary/80 mb-1">Generation</p>
                              <p className="text-base">{products.find(p => p.id === selectedProduct)?.generation || 'N/A'}</p>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-primary/80 mb-1">Area Required</p>
                              <p className="text-base">{products.find(p => p.id === selectedProduct)?.area_required} sq.ft</p>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-primary/80 mb-1">Monthly Savings</p>
                              <p className="text-base">₹{products.find(p => p.id === selectedProduct)?.monthly_savings}/mo</p>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-primary/80 mb-1">Panel Type</p>
                              <p className="text-base">{products.find(p => p.id === selectedProduct)?.panel_type}</p>
                            </div>
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-primary/80 mb-1">Installation</p>
                              <p className="text-base">{products.find(p => p.id === selectedProduct)?.installation_time || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price and CTA */}
                        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                          <div>
                            <p className="text-xs text-light/50 mb-1">From</p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-3xl font-bold text-light">₹{(products.find(p => p.id === selectedProduct)?.price - (products.find(p => p.id === selectedProduct)?.subsidy_amount || 0)).toLocaleString()}</p>
                              <p className="text-light/50 line-through">₹{products.find(p => p.id === selectedProduct)?.price.toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-light/60">Price after government subsidy</p>
                          </div>
                          
                          <Button 
                            variant="primary" 
                            size="xl" 
                            radius="full" 
                            className="group relative overflow-hidden px-8 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                            onClick={() => {
                              const prod = products.find(p => p.id === selectedProduct);
                              if (prod) handleBuyClick(prod);
                            }}
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Buy
                              <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 transition-transform duration-500 group-hover:scale-105"></span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Site Visit Modal */}
      <AnimatePresence>
        {isSiteVisitModalOpen && siteVisitProduct && (
          <SiteVisitForm
            isOpen={isSiteVisitModalOpen}
            onClose={handleCloseSiteVisit}
            productSku={siteVisitProduct.sku}
            productName={siteVisitProduct.name}
            productPower={siteVisitProduct.power}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
