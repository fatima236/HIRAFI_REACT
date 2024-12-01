import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
} from '@mui/material';
import { FaMapMarkerAlt, FaCheckCircle, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import artisanImage from '../assets/tech1.jpg';

const FilterSection = () => { 
  const [userLocation, setUserLocation] = useState(null); 
  const [selectedProfession, setSelectedProfession] = useState(''); 
  const [isLocationFetched, setIsLocationFetched] = useState(false); 
  const [carouselIndex, setCarouselIndex] = useState(0);

  const professions = ['Plombier', 'Mécanicien', 'Menuisier', 'Peintre'];
  
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const getUserLocation = () => { 
    setUserLocation({ lat: 51.505, lng: -0.09 }); 
    setIsLocationFetched(true); 
  }; 

  React.useEffect(() => { 
    const interval = setInterval(() => { 
      setCarouselIndex((prevIndex) => (prevIndex + 1) % professions.length); 
    }, 3000); 
    return () => clearInterval(interval); 
  }, [professions.length]); 

  // Fonction de gestion du clic sur le bouton de recherche
  const handleSearchClick = () => {
    navigate('/map'); // Redirection vers la page /map
  };

  return ( 
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4} alignItems="center"> 
        {/* Left Column - Welcome Section */}
        <Grid item xs={12} md={6}> 
          <Card 
            sx={{ 
              padding: '20px', 
              marginBottom: '20px', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
              borderRadius: '10px', 
              backgroundColor: 'transparent', 
              animation: 'fadeIn 1s ease-out',
            }} 
          > 
            <CardContent> 
              <Typography 
                variant="h4" 
                sx={{ 
                  textAlign: 'center', 
                  color: '#333', 
                  fontWeight: 'bold', 
                  marginBottom: 2, 
                  fontSize: '32px', 
                }} 
              > 
                Bienvenue chez Hirafi ! 
              </Typography> 
              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center', 
                  color: '#555', 
                  marginBottom: 3, 
                  fontWeight: 'normal', 
                  fontSize: '16px', 
                }} 
              > 
                Une plateforme pour connecter les artisans marocains avec leurs clients. 
              </Typography> 
            </CardContent> 
          </Card> 

          <Card 
            sx={{ 
              backgroundColor: '#ffffff', 
              color: '#333', 
              padding: '20px', 
              borderRadius: '15px', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
              animation: 'fadeIn 1s ease-out',
            }} 
          > 
            <CardContent> 
              <Typography 
                variant="h5" 
                sx={{ 
                  textAlign: 'center', 
                  marginBottom: 2, 
                  color: '#4caf50', 
                  fontWeight: 'bold', 
                }} 
              > 
                Trouvez un Artisan 
              </Typography> 

              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'normal', 
                  color: '#555', 
                  marginBottom: 3, 
                }} 
              > 
                {`Spécialité : ${professions[carouselIndex]}`} 
              </Typography> 

              {/* Search Form */}
              <Box 
                display="flex" 
                alignItems="center" 
                gap={2} 
                flexWrap="wrap" 
                justifyContent="center" 
              > 
                <FormControl variant="outlined" sx={{ minWidth: 200 }}> 
                  <InputLabel>Choisissez un métier</InputLabel> 
                  <Select 
                    value={selectedProfession} 
                    onChange={(e) => setSelectedProfession(e.target.value)} 
                    label="Choisissez un métier" 
                  > 
                    {professions.map((profession, index) => ( 
                      <MenuItem key={index} value={profession.toLowerCase()}> 
                        {profession} 
                      </MenuItem> 
                    ))} 
                  </Select> 
                </FormControl> 

                <TextField 
                  label="Votre localisation" 
                  value={userLocation ? `${userLocation.lat}, ${userLocation.lng}` : ''} 
                  InputProps={{ 
                    readOnly: true, 
                    startAdornment: ( 
                      <FaMapMarkerAlt style={{ marginRight: 8, color: '#4caf50' }} /> 
                    ), 
                    endAdornment: ( 
                      <Button 
                        variant="contained" 
                        onClick={getUserLocation} 
                        sx={{ 
                          backgroundColor: isLocationFetched ? '#4caf50' : '#d32f2f', 
                          '&:hover': { 
                            backgroundColor: isLocationFetched ? '#388e3c' : '#b71c1c', 
                          }, 
                          color: 'white', 
                          fontSize: '10px', 
                          padding: '5px', 
                          minWidth: 'unset', 
                        }} 
                      > 
                        {isLocationFetched ? <FaCheckCircle /> : 'Activer'} 
                      </Button> 
                    ), 
                  }} 
                  sx={{ flex: 2 }} 
                /> 

                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#ff9800', 
                    '&:hover': { backgroundColor: '#fb8c00' }, 
                    padding: '10px', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    borderRadius: '50%', 
                    width: '50px', 
                    height: '50px', 
                    minWidth: 'unset', 
                  }} 
                  onClick={handleSearchClick} // Ajout du gestionnaire de clic
                > 
                  <FaSearch color="white" /> 
                </Button> 
              </Box> 
            </CardContent> 
          </Card> 
        </Grid> 

        {/* Right Column - Image Section */} 
        <Grid item xs={12} md={6}> 
          <Box textAlign="center"> 
            <img 
              src={artisanImage} 
              alt="Artisan" 
              style={{ 
                width: '100%', 
                maxWidth: '500px', 
                height: 'auto', 
                borderRadius: '15px', 
                border: '4px solid #ff9800', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              }} 
              className="hover-image" 
            /> 
          </Box> 
        </Grid>

      </Grid> 
    </Box> 
  ); 
}; 

export default FilterSection;
