// Định nghĩa theme cho Filter components
export const filterTheme = {
  // Colors
  backgroundColor: 'rgba(58, 56, 65, 0.6)',  // Nền đen trong suốt
  borderColor: '#3a3841',                    // Viền tối
  labelColor: '#89888b',                     // Màu xám cho labels
  inputBackground: '#31393E',                // Nền tối cho inputs
  inputTextColor: '#ffffff',                 // Text trắng
  sliderRailColor: '#3a3841',                // Thanh slider tối
  sliderTrackGradient: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.4) -6%, rgba(218, 52, 221, 0.4) 113.05%)', // Gradient hồng-tím
  primaryButtonColor: '#da458f',             // Nút primary màu hồng
  primaryButtonHoverColor: '#da34dd',        // Hover màu tím
  dividerColor: '#89888b',                   // Divider màu xám
  
  // Spacing
  containerPadding: '20px',
  itemMarginBottom: '50px',
  
  // Typography
  labelFontSize: '16px',
  labelFontWeight: 600,
  titleFontSize: '20px',
  titleFontWeight: 'bold',
  
  // Borders
  borderRadius: '10px',
  borderWidth: '1px',
  
  // Transitions
  defaultTransition: 'all 0.3s ease',
  
  // Helper styles
  labelStyle: {
    color: '#89888b', 
    fontSize: '16px', 
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  
  inputStyle: { 
    backgroundColor: '#31393E',
    borderColor: '#31393E',
    color: '#ffffff'
  },
  
  cardStyle: {
    padding: '20px', 
    background: 'rgba(58, 56, 65, 0.6)', 
    borderRadius: '10px',
    borderColor: '#3a3841',
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  
  primaryButtonStyle: {
    background: '#da458f',
    borderColor: '#da458f',
    transition: 'all 0.3s ease'
  },
  
  defaultButtonStyle: {
    borderColor: '#89888B', 
    color: '#89888B'
  },
  
  dividerStyle: {
    borderColor: '#89888b', 
    borderWidth: '1px'
  }
};

export default filterTheme; 