const SideBar = () => {
  return (
    <div className="hidden lg:flex lg:w-2/6" aria-label="Sidebar">
      <div className="flex h-12 w-full items-center rounded-lg border bg-white px-4">
        <p className="text-lg font-medium">Notifications</p>
      </div>
    </div>
  );
};

export default SideBar;
