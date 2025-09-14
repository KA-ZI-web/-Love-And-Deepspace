import './Header.css'

interface MenuItem {
  className: string;
  label: string;
  subLabel: string;
}

interface HeaderProps {
  onMenuClick?: (index: number) => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  // 菜单项配置，与pageData顺序对应
  const menuItems: MenuItem[] = [
    { className: 'home', label: '首页', subLabel: 'HOME' },
    { className: 'character', label: '角色介绍', subLabel: 'CHARACTERS' },
    { className: 'feature', label: '特色玩法', subLabel: 'FEATURES' },
    { className: 'views', label: '视听中心', subLabel: 'GALLERY' },
  ];

  const handleClick = (index: number) => {
    if (onMenuClick) {
      onMenuClick(index);
    }
  }

    return(
      <div className='M-header'>
        <div className='M-header-content'>
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className={`M-header-em ${item.className}`}
              onClick={() => handleClick(index)}
            >
              <span>{item.label}</span>
              {item.subLabel && <p>{item.subLabel}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Header