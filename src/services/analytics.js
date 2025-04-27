// Service pour gérer les analytics du site
import { useState, useEffect } from 'react';

// URL de l'API backend (à remplacer par votre vrai endpoint quand vous aurez un backend)
const API_URL = '/api/analytics';

export const useAnalytics = () => {
  const [pageViews, setPageViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour enregistrer une visite
  const recordVisit = async () => {
    try {
      // Dans une version de production, ce serait un vrai appel API
      // Pour l'instant, nous utilisons localStorage pour simuler
      const currentVisits = localStorage.getItem('portfolio_visits') || '0';
      const newVisits = parseInt(currentVisits) + 1;
      
      // Enregistrer les informations du visiteur
      const visitorData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        referrer: document.referrer || 'direct',
        screen: {
          width: window.screen.width,
          height: window.screen.height
        },
        visitCount: newVisits
      };
      
      // Stocker les données dans localStorage
      localStorage.setItem('portfolio_visits', newVisits.toString());
      
      // Stocker l'historique des visites (limite à 100 pour ne pas surcharger localStorage)
      const visitsHistory = JSON.parse(localStorage.getItem('portfolio_visits_history') || '[]');
      visitsHistory.push(visitorData);
      if (visitsHistory.length > 100) {
        visitsHistory.shift(); // Supprimer l'élément le plus ancien
      }
      localStorage.setItem('portfolio_visits_history', JSON.stringify(visitsHistory));
      
      // Mettre à jour le compteur
      setPageViews(newVisits);
      setLoading(false);
      
      // Dans une version réelle, vous feriez un appel API comme ceci :
      // const response = await fetch(API_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(visitorData),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to record visit');
      // }
      //
      // const data = await response.json();
      // setPageViews(data.totalVisits);
      
    } catch (err) {
      console.error('Error recording visit:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Fonction pour obtenir le nombre total de visites
  const getVisitCount = async () => {
    try {
      // Version simulée avec localStorage
      const visits = localStorage.getItem('portfolio_visits') || '0';
      setPageViews(parseInt(visits));
      setLoading(false);
      
      // Version réelle avec API:
      // const response = await fetch(`${API_URL}/count`);
      // if (!response.ok) {
      //   throw new Error('Failed to get visit count');
      // }
      // const data = await response.json();
      // setPageViews(data.totalVisits);
      
    } catch (err) {
      console.error('Error getting visit count:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Au chargement de la page, enregistrer une visite et récupérer le compteur
  useEffect(() => {
    const recordVisitOnce = async () => {
      await recordVisit();
      await getVisitCount();
    };
    
    recordVisitOnce();
  }, []);

  return { pageViews, loading, error };
};

// Fonction d'exportation des données analytics (pour la version réelle)
export const exportAnalyticsData = () => {
  try {
    const visitsHistory = JSON.parse(localStorage.getItem('portfolio_visits_history') || '[]');
    const dataStr = JSON.stringify(visitsHistory, null, 2);
    
    // Créer un blob et un lien de téléchargement
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error exporting analytics data:', err);
  }
};