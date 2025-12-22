
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './admin/Layout';
import Dashboard from './admin/Dashboard';
import MenuManagement from './admin/MenuManagement';
import OrderManagement from './admin/OrderManagement';
import ArtGalleryManagement from './admin/ArtGalleryManagement';
import WorkshopManagement from './admin/WorkshopManagement';
import FranchiseManagement from './admin/FranchiseManagement';
import MarketingCMS from './admin/MarketingCMS';
import UserManagement from './admin/UserManagement';

import { 
  INITIAL_MENU, 
  INITIAL_ORDERS, 
  INITIAL_ARTWORKS, 
  INITIAL_WORKSHOPS, 
  INITIAL_LEADS, 
  INITIAL_FAQS, 
  INITIAL_USERS 
} from './constants';
import { 
  MenuItem, 
  Order, 
  OrderStatus, 
  DashboardStats, 
  Artwork, 
  Workshop, 
  FranchiseLead, 
  FAQ, 
  User, 
  LeadStatus 
} from './types';

const Admin: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [workshops, setWorkshops] = useState<Workshop[]>(INITIAL_WORKSHOPS);
  const [leads, setLeads] = useState<FranchiseLead[]>(INITIAL_LEADS);
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 12845.50,
    totalOrdersToday: orders.length,
    activeBookings: workshops.length,
    artInquiries: leads.length,
    isStoreOpen: true
  });

  const handleToggleStore = () => {
    setIsStoreOpen(!isStoreOpen);
    setStats(prev => ({ ...prev, isStoreOpen: !isStoreOpen }));
  };

  return (
    <Layout isStoreOpen={isStoreOpen} onToggleStore={handleToggleStore}>
      <Routes>
        <Route path="/" element={<Dashboard stats={stats} />} />
        <Route 
          path="/menu" 
          element={
            <MenuManagement 
              items={menuItems} 
              onAddItem={(item) => setMenuItems([item, ...menuItems])} 
              onUpdateItem={(item) => setMenuItems(menuItems.map(i => i.id === item.id ? item : i))} 
            />
          } 
        />
        <Route 
          path="/orders" 
          element={
            <OrderManagement 
              orders={orders} 
              onUpdateStatus={(id, s) => setOrders(orders.map(o => o.id === id ? { ...o, status: s } : o))} 
            />
          } 
        />
        <Route 
          path="/gallery" 
          element={
            <ArtGalleryManagement 
              artworks={artworks} 
              onAdd={(a) => setArtworks([a, ...artworks])} 
              onUpdate={(a) => setArtworks(artworks.map(i => i.id === a.id ? a : i))} 
            />
          } 
        />
        <Route 
          path="/workshops" 
          element={
            <WorkshopManagement 
              workshops={workshops} 
              onAdd={(w) => setWorkshops([w, ...workshops])} 
              onUpdate={(w) => setWorkshops(workshops.map(i => i.id === w.id ? w : i))} 
            />
          } 
        />
        <Route 
          path="/franchise" 
          element={
            <FranchiseManagement 
              leads={leads} 
              onUpdateStatus={(id, s) => setLeads(leads.map(l => l.id === id ? { ...l, status: s } : l))} 
            />
          } 
        />
        <Route 
          path="/marketing" 
          element={
            <MarketingCMS 
              faqs={faqs} 
              onUpdateFaqs={setFaqs} 
            />
          } 
        />
        <Route 
          path="/users" 
          element={<UserManagement users={users} />} 
        />
      </Routes>
    </Layout>
  );
};

export default Admin;
