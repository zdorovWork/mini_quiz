import { ReactNode } from "react";
import { Card } from "../../../../components";
import "./QuestionPageLayout.css";

interface QuestionPageLayoutProps {
  nextButton?: ReactNode;
  label?: ReactNode;
  title?: ReactNode;
  options?: ReactNode;
}

const QuestionPageLayout = ({
  nextButton,
  label,
  title,
  options,
}: QuestionPageLayoutProps) => {
  return (
    <div className="question-page-layout">
      <div className="question-page-layout__container">
        <Card>
          <div className="question-page-layout__header">{label}</div>

          <div className="question-page-layout__title">{title}</div>

          <div className="question-page-layout__options">{options}</div>

          {nextButton}
        </Card>
      </div>
    </div>
  );
};

export default QuestionPageLayout;
