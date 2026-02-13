export default function RightSidebar() {
  return (
    <aside className="right-sidebar lg:block hidden panel h-fit">
      <h2 className="mb-4 font-bold text-xl text-gray-700">Contact</h2>
      <div className="grid gap-4">
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <div key={v} className="center-y hover:bg-gray-100 p-2 rounded-md">
            <div className="relative rounded-full mr-3 p-4 bg-gray-300">
              <span className="absolute bg-green-500 w-3 h-3 rounded-full bottom-[-.5px] right-[-.5px]"></span>
            </div>
            <span className="text-gray-900 font-semibold text-sm">
              Friend {v}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
