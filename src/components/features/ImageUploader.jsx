export default function ImageUploader({ image, onChange }) {
  return (
    <div className="rounded-xl p-10 text-center items-center justify-center shadow-md border-2 border-dashed border-purple-300">
      {!image ? (
        <>
          <img className="mx-auto mb-4" src="Upload.svg" alt="Upload" />
          <label className="cursor-pointer mt-7 ml-2 px-4 py-2 bg-purple-600 text-white rounded-full font-semibold">
            Add Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => onChange(e.target.files[0])}
            />
          </label>
        </>
      ) : (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="max-h-60 mx-auto rounded-lg"
        />
      )}
    </div>
  );
}