"use client";

const SpinnerLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-purple-900 to-black">
      <img
        src="/loading.gif"
        alt="Carregando..."
        className="object-cover w-full h-full"
      />
      {/* Se quiser uma mensagem abaixo:
      <p className="text-white mt-4 text-sm">Autenticando usuário...</p>
      */}
    </div>
  );
};

export default SpinnerLoading;
