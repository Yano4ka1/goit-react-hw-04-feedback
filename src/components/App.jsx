import { useState } from "react";

import { Sections } from "./Sections/Sections";
import { Notification } from "./Notification/Notification";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";

export const App = () => {
    const [feedbackState, setFeedback] = useState({
      good: 0,
      neutral: 0,
      bad: 0,
    })

  const onClick = stateName => {
    setFeedback((prevState) => ({
      ...prevState,
      [stateName]: prevState[stateName] + 1,
  }))
  }

  const countTotalFeedback = () => {
    return feedbackState.good + feedbackState.neutral + feedbackState.bad;
  }

  const countPositiveFeedbackPercentage = () => {
    return (feedbackState.good / countTotalFeedback() * 100).toFixed(0);
  }

    const options = Object.keys(feedbackState);
      return<>
          <Sections title="Please leave feedback">
            <FeedbackOptions
              options={options}
              onLeaveFeedback={onClick} />
          </Sections>

          <Sections title="Statistics">
            {countTotalFeedback() === 0? <Notification message='No feedback given'/>: (<div>
              <Statistics
                good={feedbackState.good}
                neutral={feedbackState.neutral}
                bad={feedbackState.bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}/>
                </div>)}
          </Sections>
      </>
}
