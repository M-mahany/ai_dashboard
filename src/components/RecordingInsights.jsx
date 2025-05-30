import { useAnalyzeRecordingMutation, useApproveRecordingMutation } from '@/lib/services/recordingsApi';
import { isPermitted } from '@/utils/helpers/checkPermission';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { TbAnalyze } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React from 'react';
import { MdOutlineInsights } from 'react-icons/md';
import { formatTime } from '@/utils/helpers/time';

const RecordingInsights = ({ recording, wavesurfer }) => {
  const insightsKeywords = [
    'customer_satisfaction',
    'customer_complaints',
    'employee_sentiment',
    'maintenance_or_equipment_issues',
    'product_feedback',
    'operational_red_flags',
    'improvement_suggestions',
  ];
  const renderOrder = ['evidence', 'recommendation'];

  const user = useSelector((state) => state.auth.user);

  const splitCamelCase = (text) => {
    return text.split('_').join(' ');
  };

  const [analyzeRecording, { data: analyzeData, isLoading: isLoadingAnalyze, error: analyzeError }] =
    useAnalyzeRecordingMutation();

  const [approveRecording, { data: approvedData, isLoading: isLoadingApprove, error: approveError }] =
    useApproveRecordingMutation();

  const data = analyzeData || approvedData;
  const error = analyzeError || approveError;

  const handleReAnalyze = () => {
    analyzeRecording(recording?._id);
  };

  const handleApprove = () => {
    approveRecording(recording?._id);
  };

  useEffect(() => {
    let type = '';
    let message = '';
    if (data) {
      type = 'success';
      message = data?.message || 'Recording sent to AI queue successfully!';
    }
    if (error) {
      type = 'error';
      message = error?.data?.message || 'Error Sending Recording to queue';
    }
    if (error || data) {
      toast(message, { type });
    }
  }, [error, data]);

  const recordingValidInsights = Object.entries(recording?.insight).filter(
    ([key, value]) => insightsKeywords.includes(key) && value['recommendation']?.['root_cause']
  );

  const handleSegementClick = (startTime) => {
    if (wavesurfer) {
      wavesurfer.seekTo(startTime / recording?.duration);
    }
  };

  return (
    <>
      {isPermitted(user, 'ANALYZE_RECORDING') && (
        <div className="bttnsWrapper">
          <Button className="reAnalyzeBttn" onClick={handleReAnalyze} disabled={isLoadingAnalyze}>
            <TbAnalyze className={`icon ${isLoadingAnalyze ? 'rotating' : ''}`} />
            {isLoadingAnalyze ? 'Sending to AI Queue...' : 'Retry AI Analysis'}
          </Button>
          {!recording?.isApproved && (
            <Button className="reAnalyzeBttn light" onClick={handleApprove} disabled={isLoadingApprove}>
              Approve
            </Button>
          )}
        </div>
      )}

      {recordingValidInsights?.length > 0 ? (
        recordingValidInsights.map(([mainKey, mainValue], mainIndex) => (
          <span className="tabContentInnerTxt" key={mainIndex}>
            <span className="heading">
              <p>{splitCamelCase(mainKey)}:</p>
            </span>
            {typeof mainValue === 'object' ? (
              renderOrder.map((outerKey, outerIndex) => {
                const outerValue = mainValue[outerKey];
                if (!outerValue) {
                  return null;
                }

                return (
                  <span className={`innerContent ${outerIndex === 0 ? 'first' : ''}`} key={outerIndex}>
                    <span className="contentTitle">{outerKey === 'evidence' ? 'Refrence' : outerKey}</span>
                    {outerKey === 'evidence' ? (
                      <p className="clickable" onClick={() => handleSegementClick(outerValue?.start)}>
                        {outerValue?.quote} - [{formatTime(outerValue?.start)} - {formatTime(outerValue?.end)}]
                      </p>
                    ) : typeof outerValue === 'object' ? (
                      Object.entries(outerValue).map(([innerKey, innerValue], innerIndex) =>
                        Array.isArray(innerValue) ? (
                          <React.Fragment key={innerIndex}>
                            <span className={`boldTxt ${innerKey}`}>{splitCamelCase(innerKey)}:</span>
                            <ol>
                              {innerValue.map((v, i) => (
                                <li key={i}>
                                  <p>{v || 'N/A'}</p>
                                </li>
                              ))}
                            </ol>
                          </React.Fragment>
                        ) : (
                          <p key={innerIndex} style={{ width: '100%' }}>
                            <>
                              <span className={`boldTxt ${innerKey}`}>{splitCamelCase(innerKey)}: </span>
                              {innerValue}
                            </>
                          </p>
                        )
                      )
                    ) : (
                      <p key={outerIndex} style={{ width: '100%' }}>
                        {outerValue}
                      </p>
                    )}
                  </span>
                );
              })
            ) : (
              <p>
                {mainValue}
                {mainKey.includes('Rate') ? '%' : ''}
              </p>
            )}
          </span>
        ))
      ) : (
        <span className="emptyContent grow">
          <MdOutlineInsights className="icon" />
          <p>No valid insights found!</p>
        </span>
      )}
    </>
  );
};

export default RecordingInsights;
