/**
 * QuizProgress Component
 * Displays a visual progress bar for the quiz
 */

import PropTypes from 'prop-types';

export default function QuizProgress({ currentStep, totalSteps, primaryColor }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2 text-sm text-neutral-600">
        <span>
          {currentStep + 1} / {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: primaryColor,
          }}
        />
      </div>
    </div>
  );
}

QuizProgress.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  primaryColor: PropTypes.string,
};

QuizProgress.defaultProps = {
  primaryColor: '#288880',
};
