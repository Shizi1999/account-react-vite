import { Outlet } from 'react-router-dom';

type MainLayoutProp = {
  children?: React.ReactNode;
};

function MainLayout(props: MainLayoutProp) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
