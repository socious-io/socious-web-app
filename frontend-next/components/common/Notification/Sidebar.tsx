const SideBar = () => {
  return (
    <div className="hidden lg:flex lg:w-2/6" aria-label="Sidebar">
      <div className="flex items-center w-full h-12 px-4 bg-white border rounded-lg">
        <p className="text-lg font-medium">Notifications</p>
      </div>
    </div>
  );
};

export default SideBar;
