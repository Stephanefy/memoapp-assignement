import MemoEditForm from './memo-edit-form';

export default function MemoDetails() {
  return (
    <div className="w-full flex justify-center items-center mt-20 ">
      <div className="card bg-white text-primary-content w-[80%] md:w-[60%] md:px-16">
        <div className="card-body md:z-10">
          <MemoEditForm />
        </div>
      </div>
    </div>
  );
}
