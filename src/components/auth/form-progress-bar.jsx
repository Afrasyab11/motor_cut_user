export const FormProgressBar = ({ stepCount }) => {
  const progressBarItems = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={`h-2 w-14 ${
        index < stepCount ? 'bg-primary' : 'bg-slate-200'
      } rounded-sm`}
    ></div>
  ));

  return <div className="flex gap-2 items-center justify-center p-3">{progressBarItems}</div>;
};
