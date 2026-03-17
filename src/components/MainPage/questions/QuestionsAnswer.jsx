import { faq } from "./questions";
import { Suspense, lazy } from "react";

const QuestionsSwiper = lazy(() => import("./QuestionsSwiper"));

const QuestionsAnswer = () => {
  return (
    <section className="mt-16 px-4 py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>
        <Suspense fallback={<div className="text-center text-gray-500">Загрузка вопросов...</div>}>
          <QuestionsSwiper faq={faq} />
        </Suspense>
      </div>
    </section>
  );
};

export default QuestionsAnswer;