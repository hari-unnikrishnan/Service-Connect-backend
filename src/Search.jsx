import React, { useState, useEffect } from 'react';
import './Search.css';
import { Search as SearchIcon, SlidersHorizontal, ArrowLeft, Grid2x2, Smartphone, RefreshCw, SquareMenu, Plus, CircleHelp } from 'lucide-react';
import { getCategories, getPopularServices } from './api.js';

import ALL from './assets/all.png';
import DELIVERYSERVICES from './assets/DELIVERY SERVICES.png';
import HOMEAPPLIANCEREPAIR from './assets/HOME APPLIANCE REPAIR.png';
import LAUNDRYSERVICE from './assets/LAUNDRY SERVICE.png';
import BUSINESSSERVICES from './assets/BUSINESS SERVICES.png';
import EVENTSANDPARTYS from './assets/EVENTS AND PARTYS.png';
import CLEANINGSERVICE from './assets/CLEANING SERVICE.png';
import ELECTRONICSREPAIR from './assets/ELECTRONICS REPAIR.png';
import TECHNOLOGYSERVICES from './assets/TECHNOLOGY SERVICES.png';
import HEALTHANDFITNESS from './assets/HEALTH AND FITNESS.png';
import BEAUTYSERVICES from './assets/BEAUTY SERVICES.png';

const categoryImages = {
  'ALL': ALL,
  'DELIVERY SERVICES': DELIVERYSERVICES,
  'HOME APPLIANCE REPAIR': HOMEAPPLIANCEREPAIR,
  'LAUNDRY SERVICE': LAUNDRYSERVICE,
  'BUSINESS SERVICES': BUSINESSSERVICES,
  'EVENTS AND PARTYS': EVENTSANDPARTYS,
  'CLEANING SERVICE': CLEANINGSERVICE,
  'ELECTRONICS REPAIR': ELECTRONICSREPAIR,
  'TECHNOLOGY SERVICES': TECHNOLOGYSERVICES,
  'HEALTH AND FITNESS': HEALTHANDFITNESS,
  'BEAUTY SERVICES': BEAUTYSERVICES
};

export default function Search({
  onNavigateToAllCategory,
  onNavigateToDeliveryServices
}) {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [recentSearches] = useState(['3D Design', 'Graphic Design', 'Programming', 'SEO & Marketing' ,'Web Development', 'Office Productivity' ,'Personal Development','Finance & Accounting','HR Management']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catData = await getCategories();
        const srvData = await getPopularServices();
        const mappedCategories = catData.map(cat => ({
          ...cat,
          image: categoryImages[cat.name.toUpperCase()] || ALL
        }));
        setCategories(mappedCategories);
        setServices(srvData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data
        setCategories([
          { id: 1, name: 'DELIVERY SERVICES', image: DELIVERYSERVICES },
          { id: 2, name: 'CLEANING SERVICE', image: CLEANINGSERVICE },
          { id: 3, name: 'HOME APPLIANCE REPAIR', image: HOMEAPPLIANCEREPAIR },
          { id: 4, name: 'BEAUTY SERVICES', image: BEAUTYSERVICES },
          { id: 5, name: 'LAUNDRY SERVICE', image: LAUNDRYSERVICE }
        ]);
        setServices([
          { id: 1, name: 'Fast Delivery', category: 'DELIVERY SERVICES' },
          { id: 2, name: 'Deep Cleaning', category: 'CLEANING SERVICE' }
        ]);
      }
    };
    fetchData();
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = services.filter(srv => 
    srv.name.toLowerCase().includes(query.toLowerCase()) ||
    srv.category?.toLowerCase().includes(query.toLowerCase())
  );

  const recentFiltered = recentSearches.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <div className="search-phone">
        <header className="search-header">
          <button
            className="back-btn"
            onClick={() => {
              onNavigateToAllCategory()
              onNavigateToDeliveryServices("Delivery")
            }}
          >
            <ArrowLeft size={24} />
          </button>
         
          <h1>Search</h1>
        </header>

        <div className="search-input-box">
          <SearchIcon size={24} color="white" />
          <input 
            type="text" 
            placeholder="Search services or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '12px', outline: 'none' }}
          />
          <SlidersHorizontal size={20} color="white" />
        </div>

        {query ? (
          <section className="search-results">
            <div className="recent-header">
              <h3>Results ({filteredCategories.length + filteredServices.length})</h3>
              <span>Clear</span>
            </div>
            <div className="recent-list">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="recent-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <span>{cat.name}</span>
                </div>
              ))}
              {filteredServices.map((srv) => (
                <div key={srv.id} className="recent-item" style={{ cursor: 'pointer' }}>
                  <span>{srv.name}</span>
                  <span style={{ color: '#9ca0a8', fontSize: '18px' }}> • {srv.category}</span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="recent-header">
              <h3>Recent searches</h3>
              <span>Clear all</span>
            </div>
            <div className="recent-list">
              {recentFiltered.map((search, index) => (
                <p key={index} style={{ cursor: 'pointer' }} onClick={() => setQuery(search)}>
                  {search}
                </p>
              ))}
            </div>
          </section>
        )}

        <footer className="bottom-nav">
          <Grid2x2 size={18} />
          <Smartphone size={18} />
          <RefreshCw size={18} />
          <SquareMenu size={18} />
          <Plus size={18} />
          <CircleHelp size={18} />
        </footer>
      </div>
    </div>
  );
}
