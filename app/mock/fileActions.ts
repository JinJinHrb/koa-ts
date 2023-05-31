export default {
  message: 'ok',
  data: [
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/containers/App/index.js',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'securityActions',
              sourceValue: 'actions/security',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/security.ts',
              exportNames: [
                'checkABVType',
                'openABVPanel',
                'closeABVPanel',
                'validateCaptchaRequested',
                'validateCaptchaSucceed',
                'validateCaptchaFailed',
                'initValidateCaptcha',
                'setABVVeriType',
                'logSliderVeriInfo',
              ],
            },
            {
              isNamespace: true,
              localName: 'xshieldActions',
              sourceValue: 'actions/xshield',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/xshield.ts',
              exportNames: [
                'identityVerifyRequested',
                'identityVerifySucceed',
                'identityVerifyFailed',
                'xshieldBindRequested',
                'xshieldBindSucceed',
                'xshieldBindFailed',
                'xshieldUnBindRequested',
                'xshieldUnBindSucceed',
                'xshieldUnBindFailed',
                'mfaWechatAuthRequested',
                'mfaWechatAuthSucceed',
                'mfaWechatAuthFailed',
                'initMfaWechatAuth',
                'setXshieldBindStep',
                'setMFAVisible',
                'setMFAParam',
                'initXshield',
                'setMFATip',
                'unBindSubAccountRequested',
                'unBindSubAccountSucceed',
                'unBindSubAccountFailed',
                'unBindSubAccountModal',
              ],
            },
            {
              isNamespace: true,
              localName: 'metaActions',
              sourceValue: 'actions/meta',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/meta.ts',
              exportNames: [
                'fetchMetaRequested',
                'fetchMetaSucceed',
                'fetchMetaFailed',
                'resetFetchMeta',
                'hideFetchMetaError',
              ],
            },
            {
              isNamespace: true,
              localName: 'sentryActions',
              sourceValue: 'actions/sentry',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/sentry.ts',
              exportNames: ['setSentryData', 'getSentryData', 'delSentryData'],
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 118,
                  column: 28,
                  index: 3738,
                },
                end: {
                  line: 263,
                  column: 1,
                  index: 7258,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [
            'userActions',
            'securityActions',
            'xshieldActions',
            'metaActions',
            'sentryActions',
          ],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/MFAPanel/index.jsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'actions/xshield',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/xshield.ts',
              exportNames: [
                'identityVerifyRequested',
                'identityVerifySucceed',
                'identityVerifyFailed',
                'xshieldBindRequested',
                'xshieldBindSucceed',
                'xshieldBindFailed',
                'xshieldUnBindRequested',
                'xshieldUnBindSucceed',
                'xshieldUnBindFailed',
                'mfaWechatAuthRequested',
                'mfaWechatAuthSucceed',
                'mfaWechatAuthFailed',
                'initMfaWechatAuth',
                'setXshieldBindStep',
                'setMFAVisible',
                'setMFAParam',
                'initXshield',
                'setMFATip',
                'unBindSubAccountRequested',
                'unBindSubAccountSucceed',
                'unBindSubAccountFailed',
                'unBindSubAccountModal',
              ],
            },
            {
              isNamespace: true,
              localName: 'bindActions',
              sourceValue: 'actions/bind',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/bind.ts',
              exportNames: [
                'bindRequested',
                'bindSucceed',
                'bindFailed',
                'modifyBindRequested',
                'modifyBindSucceed',
                'modifyBindFailed',
                'setBindStep',
                'resetBindStep',
                'hideBindError',
              ],
            },
            {
              isNamespace: true,
              localName: 'passwordActions',
              sourceValue: 'actions/password',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/password.ts',
              exportNames: [
                'modifyTradePasswordRequested',
                'modifyTradePasswordSucceed',
                'modifyTradePasswordFailed',
                'initModifyTradePassword',
                'forgotTradePasswordRequested',
                'forgotTradePasswordSucceed',
                'forgotTradePasswordFailed',
                'initForgotTradePassword',
                'setTradePasswordRequested',
                'setTradePasswordSucceed',
                'setTradePasswordFailed',
                'initSetTradePassword',
                'modifyLoginPasswordRequested',
                'modifyLoginPasswordSucceed',
                'modifyLoginPasswordFailed',
                'setModifyLoginPasswordStep',
                'resetModifyLoginPassword',
                'hideModifyLoginPasswordError',
                'initLoginPasswordRequested',
                'initLoginPasswordSucceed',
                'initLoginPasswordFailed',
                'initInitLoginPassword',
              ],
            },
            {
              isNamespace: true,
              localName: 'vcodeActions',
              sourceValue: 'actions/vcode',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/vcode.ts',
              exportNames: [
                'updateCountDownSeconds',
                'stopVcodeCountDown',
                'sendVcodeMessage',
                'sendVcodeMessageSucceed',
                'sendVcodeMessageFailed',
                'hideVcodeTip',
              ],
            },
            {
              isNamespace: true,
              localName: 'withdrawalsActions',
              sourceValue: 'actions/withdrawals',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/withdrawals.ts',
              exportNames: [
                'accountListRequested',
                'accountListSucceed',
                'accountListFailed',
                'hideAccountListError',
                'deleteItemRequested',
                'deleteItemSucceed',
                'deleteItemFailed',
                'swithDeleteItemModal',
                'setDeleteItemId',
                'setDeleteItemType',
                'hideDeleteItemError',
                'historyDetailRequested',
                'historyDetailSucceed',
                'historyDetailFailed',
                'hideHistoryDetailError',
                'createAccountRequested',
                'createAccountSucceed',
                'createAccountFailed',
                'setCreateAccountStep',
                'resetCreateAccount',
                'hideCreateAccountError',
                'withdrawFXAddRequested',
                'withdrawFXAddSucceed',
                'withdrawFXAddFailed',
                'hideWithdrawFXAddError',
                'setWithdrawFXAddStep',
                'resetWithdrawFXAdd',
                'withdrawFXAddVerifyRequested',
                'withdrawFXAddVerifySucceed',
                'withdrawFXAddVerifyFailed',
                'queryBanks',
                'queryBanksSucceed',
                'queryBanksFailed',
                'queryProvinces',
                'queryProvincesSucceed',
                'queryProvincesFailed',
                'getLegalProfile',
                'getLegalProfileSucceed',
                'getLegalProfileFailed',
                'createTransferAccountRequested',
                'createTransferAccountSucceed',
                'createTransferAccountFailed',
                'hideCreateTransferAccountError',
                'setCreateTransferAccountStep',
                'resetCreateTransferAccount',
                'setBeneficiaryNameError',
                'getBeneficiayAccountNoRequested',
                'getBeneficiayAccountNoSucceed',
                'getBeneficiayAccountNoFailed',
                'resetBeneficiayAccountNo',
                'getAccountLimitRequested',
                'getAccountLimitSucceed',
                'getAccountLimitFailed',
                'bindAccountPhoneNoRequested',
                'bindAccountPhoneNoSucceed',
                'bindAccountPhoneNoFailed',
                'bindAccountPhoneNoVerifyFailed',
                'swithBindPhoneNoModal',
                'getBeneficiayPhoneNoRequested',
                'getBeneficiayPhoneNoSucceed',
                'getBeneficiayPhoneNoFailed',
                'resetBeneficiayPhoneNo',
              ],
            },
            {
              isNamespace: true,
              localName: 'withdrawActions',
              sourceValue: 'actions/withdraw',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/withdraw.ts',
              exportNames: [
                'withdrawListRequested',
                'withdrawListSucceed',
                'withdrawListFailed',
                'hideWithdrawListError',
                'resetWithdrawList',
                'changeTab',
                'switchWithdrawApplyModal',
                'setWithdrawApplyIsReserved',
                'withdrawApplyRequested',
                'withdrawApplySucceed',
                'withdrawApplyFailed',
                'hideWithdrawApplyError',
                'setStep',
                'resetWithdrawApply',
                'withdrawInitRequested',
                'withdrawInitSucceed',
                'withdrawInitFailed',
                'hideWithdrawInitError',
                'withdrawDebtRequested',
                'withdrawDebtSucceed',
                'withdrawDebtFailed',
                'hideWithdrawDebtError',
                'removeRelatedItemOrderId',
                'addRelatedItemOrderId',
                'inputChangeRelatedItemValue',
                'resetRelatedOrders',
                'changeRelatedOrderChecked',
                'resetRelatedOrderChecked',
                'swithWithdrawFXApplyModal',
                'setWithdrawFXApplyStep',
                'setWithdrawFXApplyIsReserved',
                'withdrawFXApplyRequested',
                'withdrawFXApplySucceed',
                'withdrawFXApplyFailed',
                'hideWithdrawFXApplyError',
                'resetWithdrawFXApply',
                'isWithdrawErrorPage',
                'getFXWithdrawFeeRequested',
                'getFXWithdrawFeeSucceed',
                'getFXWithdrawFeeFailed',
                'hideGetFXWithdrawFeeError',
                'resetGetFXWithdrawFee',
                'getFXCanRelatedOrderRequested',
                'getFXCanRelatedOrderSucceed',
                'getFXCanRelatedOrderFailed',
                'hideGetFXCanRelatedOrderError',
                'resetGetFXCanRelatedOrder',
                'pushFXCanRelatedOrderRequested',
                'pushFXCanRelatedOrderSucceed',
                'pushFXCanRelatedOrderFailed',
                'swithWithdrawFXReApplyModal',
                'setWithdrawFXReApplyStep',
                'withdrawFXReApplyRequested',
                'withdrawFXReApplySucceed',
                'withdrawFXReApplyFailed',
                'resetWithdrawFXReApply',
                'hideWithdrawFXReApplyError',
                'getWithdrawReApplyItemRequested',
                'getWithdrawReApplyItemSucceed',
                'getWithdrawReApplyItemFailed',
                'resetGetWithdrawReApplyItem',
                'withdrawCheckBothFrozen',
                'withdrawCheckBothFrozenSucceed',
                'withdrawCheckBothFrozenFailed',
                'getFxWithdrawHolderTypeRequested',
                'getFxWithdrawHolderTypeSucceed',
                'getFxWithdrawHolderTypeFailed',
                'withdrawDetailRequested',
                'withdrawDetailSucceed',
                'withdrawDetailFailed',
                'resetWithdrawDetail',
                'withdrawFeeRequested',
                'withdrawFeeSucceed',
                'withdrawFeeFailed',
                'queryAddMaterialInfoRequested',
                'queryAddMaterialInfoSucceed',
                'queryAddMaterialInfoFailed',
                'addMaterialCommitRequested',
                'addMaterialCommitSucceed',
                'addMaterialCommitFailed',
                'resetAddMaterialCommit',
                'cancelFxWithdrawRequested',
                'cancelFxWithdrawSucceed',
                'cancelFxWithdrawFailed',
                'resetCancelFxWithdraw',
                'setCancelFxWithdrawModal',
                'cancelWithdrawRequested',
                'cancelWithdrawSucceed',
                'cancelWithdrawFailed',
                'resetCancelWithdraw',
                'setCancelWithdrawModal',
                'cancelOnGoingTransferRequested',
                'cancelOnGoingTransferSucceed',
                'cancelOnGoingTransferFailed',
                'resetCancelOnGoingTransfer',
                'setCancelOnGoingTransferModal',
                'withdrawSupportCcys',
                'withdrawSupportCcysSucceed',
                'withdrawSupportCcysFailed',
                'transferFeeRequested',
                'transferFeeSucceed',
                'transferFeeFailed',
                'setTransferApplyStep',
                'transferApplyRequested',
                'transferApplySucceed',
                'transferApplyFailed',
                'hideTransferApplyError',
                'resetTransferApply',
                'setTransferStep',
                'queryTransferAddMaterialInfoRequested',
                'queryTransferAddMaterialInfoSucceed',
                'queryTransferAddMaterialInfoFailed',
                'transferAddMaterialCommitRequested',
                'transferAddMaterialCommitSucceed',
                'transferAddMaterialCommitFailed',
                'resetTransferAddMaterialCommit',
                'cancelTransferRequested',
                'cancelTransferSucceed',
                'cancelTransferFailed',
                'resetCancelTransfer',
                'setCancelModal',
                'addCardInfoRequested',
                'addCardInfoSucceed',
                'addCardInfoFailed',
                'querySupportBoostRequested',
                'querySupportBoostSucceed',
                'querySupportBoostFailed',
                'resetQuerySupportBoost',
                'queryCanFastWithdrawWorkRequested',
                'queryCanFastWithdrawWorkFailed',
                'queryCanFastWithdrawWorkSuccess',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 93,
                  column: 52,
                  index: 2934,
                },
                end: {
                  line: 387,
                  column: 1,
                  index: 12183,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [
            'actions',
            'bindActions',
            'passwordActions',
            'vcodeActions',
            'withdrawalsActions',
            'withdrawActions',
            'userActions',
          ],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/Modal/SetLoginPasswordModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'utilActions',
              sourceValue: 'actions/util',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/util.ts',
              exportNames: [
                'pubKeyRequested',
                'pubKeySucceed',
                'pubKeyFailed',
                'toggleOrderAnnexUpload',
                'setIsMobile',
                'getFirmStatusRequested',
                'getFirmStatusSucceed',
                'getFirmStatusFailed',
                'setPreviewPageId',
                'setCountrys',
                'setProvinces',
                'setLoadAddress',
                'getLocationRequested',
                'getLocationSucceed',
                'getLocationFailed',
                'touchAndChangeAddressFields',
                'resetAddressFieldsThenSetCountry',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SetLoginPasswordModal',
              loc: {
                start: {
                  line: 73,
                  column: 60,
                  index: 1839,
                },
                end: {
                  line: 73,
                  column: 81,
                  index: 1860,
                },
                identifierName: 'SetLoginPasswordModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions', 'userActions', 'utilActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/HomePage/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'trendActions',
              sourceValue: 'actions/trend',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/trend.ts',
              exportNames: [
                'rateTrendRequested',
                'rateTrendSucceed',
                'rateTrendFailed',
                'resetRateTrend',
                'setRateTrendRange',
              ],
            },
            {
              isNamespace: true,
              localName: 'metaActions',
              sourceValue: 'actions/meta',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/meta.ts',
              exportNames: [
                'fetchMetaRequested',
                'fetchMetaSucceed',
                'fetchMetaFailed',
                'resetFetchMeta',
                'hideFetchMetaError',
              ],
            },
            {
              isNamespace: true,
              localName: 'passwordActions',
              sourceValue: 'actions/password',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/password.ts',
              exportNames: [
                'modifyTradePasswordRequested',
                'modifyTradePasswordSucceed',
                'modifyTradePasswordFailed',
                'initModifyTradePassword',
                'forgotTradePasswordRequested',
                'forgotTradePasswordSucceed',
                'forgotTradePasswordFailed',
                'initForgotTradePassword',
                'setTradePasswordRequested',
                'setTradePasswordSucceed',
                'setTradePasswordFailed',
                'initSetTradePassword',
                'modifyLoginPasswordRequested',
                'modifyLoginPasswordSucceed',
                'modifyLoginPasswordFailed',
                'setModifyLoginPasswordStep',
                'resetModifyLoginPassword',
                'hideModifyLoginPasswordError',
                'initLoginPasswordRequested',
                'initLoginPasswordSucceed',
                'initLoginPasswordFailed',
                'initInitLoginPassword',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 102,
                  column: 49,
                  index: 3726,
                },
                end: {
                  line: 742,
                  column: 1,
                  index: 20544,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['trendActions', 'metaActions', 'passwordActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/containers/App/Dashboard/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'navActions',
              sourceValue: 'actions/nav',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/nav.ts',
              exportNames: [
                'sideNavbarRequested',
                'sideNavbarSucceed',
                'sideNavbarFailed',
                'resetSideNavbar',
              ],
            },
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: false,
              localName: 'setMFATip',
              importedName: 'setMFATip',
              sourceValue: 'actions/xshield',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/xshield.ts',
            },
            {
              isNamespace: false,
              localName: 'queryCountriesIfNeeded',
              importedName: 'queryCountriesIfNeeded',
              sourceValue: 'actions/addressLocations',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/addressLocations.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 62,
                  column: 59,
                  index: 2013,
                },
                end: {
                  line: 149,
                  column: 1,
                  index: 4286,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['navActions', 'modalActions'],
          objectPropertyMap: {
            setMFATip: 'setMFATip',
            queryCountriesIfNeeded: 'queryCountriesIfNeeded',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Agenda/AgendaHome/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AgendaHome',
              loc: {
                start: {
                  line: 150,
                  column: 2,
                  index: 4683,
                },
                end: {
                  line: 150,
                  column: 12,
                  index: 4693,
                },
                identifierName: 'AgendaHome',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/BusinessEditor/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'uploadActions',
              sourceValue: 'foreignTradePlatform/actions/upload',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/upload.ts',
              exportNames: [
                'uploadRequest',
                'uploadSucceed',
                'uploadFailed',
                'uploadInit',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BusinessEditor',
              loc: {
                start: {
                  line: 298,
                  column: 4,
                  index: 10021,
                },
                end: {
                  line: 298,
                  column: 18,
                  index: 10035,
                },
                identifierName: 'BusinessEditor',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['uploadActions'],
          objectPropertyMap: {
            change: 'change',
            nav: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/BusinessUpdate/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BusinessUpdate',
              loc: {
                start: {
                  line: 50,
                  column: 2,
                  index: 1294,
                },
                end: {
                  line: 50,
                  column: 16,
                  index: 1308,
                },
                identifierName: 'BusinessUpdate',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/MallPurchase/MallPurchaseHome/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'mallActions',
              sourceValue: 'foreignTradePlatform/actions/mall',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/mall.ts',
              exportNames: [
                'queryProduct',
                'queryProductSucceed',
                'queryProductFailed',
                'initProduct',
                'getCurrentProduct',
                'getCurrentProductSucceed',
                'getCurrentProductFailed',
                'initCurrencyProduct',
                'getCurrentEdmProduct',
                'getCurrentEdmProductSucceed',
                'getCurrentEdmProductFailed',
                'initCurrencyEdmProduct',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'PurchaseHome',
              loc: {
                start: {
                  line: 244,
                  column: 20,
                  index: 8942,
                },
                end: {
                  line: 244,
                  column: 32,
                  index: 8954,
                },
                identifierName: 'PurchaseHome',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['userActions', 'mallActions'],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/MallPurchase/MallPurchaseFlow/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'mallActions',
              sourceValue: 'foreignTradePlatform/actions/mall',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/mall.ts',
              exportNames: [
                'queryProduct',
                'queryProductSucceed',
                'queryProductFailed',
                'initProduct',
                'getCurrentProduct',
                'getCurrentProductSucceed',
                'getCurrentProductFailed',
                'initCurrencyProduct',
                'getCurrentEdmProduct',
                'getCurrentEdmProductSucceed',
                'getCurrentEdmProductFailed',
                'initCurrencyEdmProduct',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'MallPurchaseFlow',
              loc: {
                start: {
                  line: 211,
                  column: 2,
                  index: 7215,
                },
                end: {
                  line: 211,
                  column: 18,
                  index: 7231,
                },
                identifierName: 'MallPurchaseFlow',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['mallActions', 'userActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/Ticket/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'MallTicket',
              loc: {
                start: {
                  line: 193,
                  column: 67,
                  index: 5873,
                },
                end: {
                  line: 193,
                  column: 77,
                  index: 5883,
                },
                identifierName: 'MallTicket',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/Order/List/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'metaActions',
              sourceValue: 'actions/meta',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/meta.ts',
              exportNames: [
                'fetchMetaRequested',
                'fetchMetaSucceed',
                'fetchMetaFailed',
                'resetFetchMeta',
                'hideFetchMetaError',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'List',
              loc: {
                start: {
                  line: 267,
                  column: 20,
                  index: 6900,
                },
                end: {
                  line: 267,
                  column: 24,
                  index: 6904,
                },
                identifierName: 'List',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['metaActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/Order/Detail/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Detail',
              loc: {
                start: {
                  line: 194,
                  column: 49,
                  index: 6533,
                },
                end: {
                  line: 194,
                  column: 55,
                  index: 6539,
                },
                identifierName: 'Detail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Customer/CustomerDetail/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'sentryActions',
              sourceValue: 'actions/sentry',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/sentry.ts',
              exportNames: ['setSentryData', 'getSentryData', 'delSentryData'],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'CustomerDetail',
              loc: {
                start: {
                  line: 222,
                  column: 3,
                  index: 7507,
                },
                end: {
                  line: 222,
                  column: 17,
                  index: 7521,
                },
                identifierName: 'CustomerDetail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['sentryActions'],
          objectPropertyMap: {
            change: 'change',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Customer/HomePage/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'sentryActions',
              sourceValue: 'actions/sentry',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/sentry.ts',
              exportNames: ['setSentryData', 'getSentryData', 'delSentryData'],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Home',
              loc: {
                start: {
                  line: 241,
                  column: 2,
                  index: 9037,
                },
                end: {
                  line: 241,
                  column: 6,
                  index: 9041,
                },
                identifierName: 'Home',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['sentryActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Template/UpdatePage/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'sentryActions',
              sourceValue: 'actions/sentry',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/sentry.ts',
              exportNames: ['setSentryData', 'getSentryData', 'delSentryData'],
            },
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Template',
              loc: {
                start: {
                  line: 142,
                  column: 3,
                  index: 4736,
                },
                end: {
                  line: 142,
                  column: 11,
                  index: 4744,
                },
                identifierName: 'Template',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['sentryActions'],
          objectPropertyMap: {
            goBack: 'goBack',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/Form/SetPasswordForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'passwordActions',
              sourceValue: 'actions/password',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/password.ts',
              exportNames: [
                'modifyTradePasswordRequested',
                'modifyTradePasswordSucceed',
                'modifyTradePasswordFailed',
                'initModifyTradePassword',
                'forgotTradePasswordRequested',
                'forgotTradePasswordSucceed',
                'forgotTradePasswordFailed',
                'initForgotTradePassword',
                'setTradePasswordRequested',
                'setTradePasswordSucceed',
                'setTradePasswordFailed',
                'initSetTradePassword',
                'modifyLoginPasswordRequested',
                'modifyLoginPasswordSucceed',
                'modifyLoginPasswordFailed',
                'setModifyLoginPasswordStep',
                'resetModifyLoginPassword',
                'hideModifyLoginPasswordError',
                'initLoginPasswordRequested',
                'initLoginPasswordSucceed',
                'initLoginPasswordFailed',
                'initInitLoginPassword',
              ],
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SetPasswordForm',
              loc: {
                start: {
                  line: 193,
                  column: 4,
                  index: 5482,
                },
                end: {
                  line: 193,
                  column: 19,
                  index: 5497,
                },
                identifierName: 'SetPasswordForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['userActions', 'passwordActions'],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/SearchTable/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SearchTable',
              loc: {
                start: {
                  line: 133,
                  column: 2,
                  index: 3333,
                },
                end: {
                  line: 133,
                  column: 13,
                  index: 3344,
                },
                identifierName: 'SearchTable',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/FormBottomBtnGroup/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'FormBottomBtnGroup',
              loc: {
                start: {
                  line: 105,
                  column: 2,
                  index: 2693,
                },
                end: {
                  line: 105,
                  column: 20,
                  index: 2711,
                },
                identifierName: 'FormBottomBtnGroup',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/AdvancedScreenForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'arrayRemove',
              importedName: 'arrayRemove',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'reset',
              importedName: 'reset',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AdvancedScreenContentForm',
              loc: {
                start: {
                  line: 225,
                  column: 2,
                  index: 5645,
                },
                end: {
                  line: 225,
                  column: 27,
                  index: 5670,
                },
                identifierName: 'AdvancedScreenContentForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
            removeArrayField: 'arrayRemove',
            reset: 'reset',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/BottomBtnGroup/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BottomBtnGroup',
              loc: {
                start: {
                  line: 67,
                  column: 2,
                  index: 1445,
                },
                end: {
                  line: 67,
                  column: 16,
                  index: 1459,
                },
                identifierName: 'BottomBtnGroup',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            nav: 'push',
            goBack: 'goBack',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/RenewTips/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'RenewTips',
              loc: {
                start: {
                  line: 93,
                  column: 16,
                  index: 2078,
                },
                end: {
                  line: 93,
                  column: 25,
                  index: 2087,
                },
                identifierName: 'RenewTips',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/HomePage/components/MainAccountFirstStep/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'meActions',
              sourceValue: 'actions/me',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/me.ts',
              exportNames: [
                'getProfileRequested',
                'getProfileSucceed',
                'getProfileFailed',
                'setProfile',
                'accountRequested',
                'accountSucceed',
                'accountFailed',
                'hideAccountError',
                'userPowerRequested',
                'userPowerSucceed',
                'userPowerFailed',
                'getDepositTodoRequested',
                'getDepositTodoSucceed',
                'getDepositTodoFailed',
                'setXtMethod',
                'setTransferNotice',
                'reset',
              ],
            },
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: true,
              localName: 'xshieldActions',
              sourceValue: 'actions/xshield',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/xshield.ts',
              exportNames: [
                'identityVerifyRequested',
                'identityVerifySucceed',
                'identityVerifyFailed',
                'xshieldBindRequested',
                'xshieldBindSucceed',
                'xshieldBindFailed',
                'xshieldUnBindRequested',
                'xshieldUnBindSucceed',
                'xshieldUnBindFailed',
                'mfaWechatAuthRequested',
                'mfaWechatAuthSucceed',
                'mfaWechatAuthFailed',
                'initMfaWechatAuth',
                'setXshieldBindStep',
                'setMFAVisible',
                'setMFAParam',
                'initXshield',
                'setMFATip',
                'unBindSubAccountRequested',
                'unBindSubAccountSucceed',
                'unBindSubAccountFailed',
                'unBindSubAccountModal',
              ],
            },
            {
              isNamespace: true,
              localName: 'bindActions',
              sourceValue: 'actions/bind',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/bind.ts',
              exportNames: [
                'bindRequested',
                'bindSucceed',
                'bindFailed',
                'modifyBindRequested',
                'modifyBindSucceed',
                'modifyBindFailed',
                'setBindStep',
                'resetBindStep',
                'hideBindError',
              ],
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 133,
                  column: 2,
                  index: 4080,
                },
                end: {
                  line: 359,
                  column: 1,
                  index: 10103,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [
            'meActions',
            'modalActions',
            'xshieldActions',
            'bindActions',
          ],
          objectPropertyMap: {
            formTouch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/tools/SideFunctions/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 137,
                  column: 60,
                  index: 4087,
                },
                end: {
                  line: 413,
                  column: 1,
                  index: 12098,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions', 'userActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Product/ProductDetail/components/TopInfoBlock/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TopInfoBlock',
              loc: {
                start: {
                  line: 141,
                  column: 2,
                  index: 4380,
                },
                end: {
                  line: 141,
                  column: 14,
                  index: 4392,
                },
                identifierName: 'TopInfoBlock',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            routerPush: 'push',
            routerGoback: 'goBack',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Agenda/AgendaTable/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Table',
              loc: {
                start: {
                  line: 422,
                  column: 3,
                  index: 11330,
                },
                end: {
                  line: 422,
                  column: 8,
                  index: 11335,
                },
                identifierName: 'Table',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
            change: 'change',
            updateFilterCondition: 'updateFilterCondition',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/AdvancedScreen/Content/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AdvancedScreenContent',
              loc: {
                start: {
                  line: 58,
                  column: 2,
                  index: 1563,
                },
                end: {
                  line: 58,
                  column: 23,
                  index: 1584,
                },
                identifierName: 'AdvancedScreenContent',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'quotationActions',
              sourceValue: 'foreignTradePlatform/actions/quotation',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/quotation/index.ts',
              exportNames: [
                'updateQuotationList',
                'updateQuotationListSuccess',
                'updateQuotationListError',
              ],
            },
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Index',
              loc: {
                start: {
                  line: 119,
                  column: 3,
                  index: 2788,
                },
                end: {
                  line: 119,
                  column: 8,
                  index: 2793,
                },
                identifierName: 'Index',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['quotationActions'],
          objectPropertyMap: {
            updateFilterCondition: 'updateFilterCondition',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/Preview/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'uploadAnnexSuccess',
              importedName: 'uploadAnnexSuccess',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Preview',
              loc: {
                start: {
                  line: 250,
                  column: 2,
                  index: 7696,
                },
                end: {
                  line: 250,
                  column: 9,
                  index: 7703,
                },
                identifierName: 'Preview',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            uploadAnnexSuccess: 'uploadAnnexSuccess',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/Trash/TrashAll/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'trashActions',
              sourceValue: 'foreignTradePlatform/actions/trash',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/trash.ts',
              exportNames: [
                'trashRecordRequest',
                'trashRecordRequestError',
                'trashRecordRequestSuccess',
                'trashRecordClear',
                'trashRecordClearAll',
                'trashRecordRestore',
                'trashRecordRestoreAll',
                'trashTypeChange',
                'trashPaginationChange',
              ],
            },
            {
              isNamespace: true,
              localName: 'customerActions',
              sourceValue: 'foreignTradePlatform/actions/customer',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/customer.ts',
              exportNames: [
                'getCustomerConfigRequest',
                'getCustomerConfigSucceed',
                'getCustomerConfigFailed',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 56,
                  column: 52,
                  index: 1625,
                },
                end: {
                  line: 256,
                  column: 1,
                  index: 7708,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['trashActions', 'customerActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/Account/AccountUpdate/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AccountUpdate',
              loc: {
                start: {
                  line: 45,
                  column: 2,
                  index: 1310,
                },
                end: {
                  line: 45,
                  column: 15,
                  index: 1323,
                },
                identifierName: 'AccountUpdate',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/Account/AccountCreate/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 22,
                  column: 2,
                  index: 620,
                },
                end: {
                  line: 30,
                  column: 1,
                  index: 827,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/FirmSetting/pubInfo/Home/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 27,
                  column: 4,
                  index: 1190,
                },
                end: {
                  line: 66,
                  column: 1,
                  index: 2596,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/UserCenter/Home/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'getProfileRequested',
              importedName: 'getProfileRequested',
              sourceValue: 'actions/me',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/me.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Home',
              loc: {
                start: {
                  line: 80,
                  column: 3,
                  index: 1785,
                },
                end: {
                  line: 80,
                  column: 7,
                  index: 1789,
                },
                identifierName: 'Home',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            getProfileRequested: 'getProfileRequested',
          },
        },
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Home',
              loc: {
                start: {
                  line: 80,
                  column: 3,
                  index: 1785,
                },
                end: {
                  line: 80,
                  column: 7,
                  index: 1789,
                },
                identifierName: 'Home',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/NavPanel/index.js',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: true,
              localName: 'faqActions',
              sourceValue: 'actions/faq',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/faq.ts',
              exportNames: [
                'getFaqMenuRequested',
                'getFaqMenuSucceed',
                'getFaqMenuFailed',
                'getFaqHomeRequested',
                'getFaqHomeSucceed',
                'getFaqHomeFailed',
                'getFaqCategoryRequested',
                'getFaqCategorySucceed',
                'getFaqCategoryFailed',
                'getMoreFaqCategorySucceed',
                'getFaqSearchRequested',
                'getFaqSearchSucceed',
                'getFaqSearchFailed',
                'getMoreFaqSearchSucceed',
                'getFaqDetailRequested',
                'getFaqDetailSucceed',
                'getFaqDetailFailed',
                'clearFaqDetail',
                'postFeedbackRequested',
                'postFeedbackSucceed',
                'postFeedbackFailed',
                'getTagFaqRequested',
                'getTagFaqSucceed',
                'getTagFaqFailed',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 36,
                  column: 52,
                  index: 1008,
                },
                end: {
                  line: 144,
                  column: 1,
                  index: 3834,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions', 'faqActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/middlewares/PermissionGuard.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'getCurrentProduct',
              importedName: 'getCurrentProduct',
              sourceValue: 'foreignTradePlatform/actions/mall',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/mall.ts',
            },
            {
              isNamespace: false,
              localName: 'getCurrentEdmProduct',
              importedName: 'getCurrentEdmProduct',
              sourceValue: 'foreignTradePlatform/actions/mall',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/mall.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'InnerCom',
              loc: {
                start: {
                  line: 215,
                  column: 3,
                  index: 6915,
                },
                end: {
                  line: 215,
                  column: 11,
                  index: 6923,
                },
                identifierName: 'InnerCom',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            getCurrentProduct: 'getCurrentProduct',
            getCurrentEdmProduct: 'getCurrentEdmProduct',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/MallPurchase/MallPurchaseFlow/components/StepOne/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'PurchaseFlowStepOne',
              loc: {
                start: {
                  line: 313,
                  column: 63,
                  index: 10556,
                },
                end: {
                  line: 313,
                  column: 82,
                  index: 10575,
                },
                identifierName: 'PurchaseFlowStepOne',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/Renew/OrderDetail/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'OrderDetail',
              loc: {
                start: {
                  line: 616,
                  column: 4,
                  index: 19239,
                },
                end: {
                  line: 616,
                  column: 15,
                  index: 19250,
                },
                identifierName: 'OrderDetail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions'],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/components/Payment/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'meActions',
              sourceValue: 'actions/me',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/me.ts',
              exportNames: [
                'getProfileRequested',
                'getProfileSucceed',
                'getProfileFailed',
                'setProfile',
                'accountRequested',
                'accountSucceed',
                'accountFailed',
                'hideAccountError',
                'userPowerRequested',
                'userPowerSucceed',
                'userPowerFailed',
                'getDepositTodoRequested',
                'getDepositTodoSucceed',
                'getDepositTodoFailed',
                'setXtMethod',
                'setTransferNotice',
                'reset',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Payment',
              loc: {
                start: {
                  line: 289,
                  column: 2,
                  index: 8093,
                },
                end: {
                  line: 289,
                  column: 9,
                  index: 8100,
                },
                identifierName: 'Payment',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['meActions'],
          objectPropertyMap: {},
        },
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Payment',
              loc: {
                start: {
                  line: 289,
                  column: 2,
                  index: 8093,
                },
                end: {
                  line: 289,
                  column: 9,
                  index: 8100,
                },
                identifierName: 'Payment',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions', 'userActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Mall/MallPurchase/MallPurchaseFlow/components/StepTwo/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'PurchaseFlowStepTwo',
              loc: {
                start: {
                  line: 539,
                  column: 4,
                  index: 17992,
                },
                end: {
                  line: 539,
                  column: 23,
                  index: 18011,
                },
                identifierName: 'PurchaseFlowStepTwo',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions'],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'orderActions',
              sourceValue: 'foreignTradePlatform/actions/order',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/order/index.ts',
              exportNames: [
                'updateOrderList',
                'updateOrderListSuccess',
                'updateOrderListError',
              ],
            },
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'OrderIndex',
              loc: {
                start: {
                  line: 120,
                  column: 3,
                  index: 2908,
                },
                end: {
                  line: 120,
                  column: 13,
                  index: 2918,
                },
                identifierName: 'OrderIndex',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['orderActions'],
          objectPropertyMap: {
            updateFilterCondition: 'updateFilterCondition',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/Preview/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'uploadAnnexSuccess',
              importedName: 'uploadAnnexSuccess',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Preview',
              loc: {
                start: {
                  line: 288,
                  column: 2,
                  index: 8476,
                },
                end: {
                  line: 288,
                  column: 9,
                  index: 8483,
                },
                identifierName: 'Preview',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            uploadAnnexSuccess: 'uploadAnnexSuccess',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'destroy',
              importedName: 'destroy',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ActivityCreate',
              loc: {
                start: {
                  line: 1171,
                  column: 90,
                  index: 36471,
                },
                end: {
                  line: 1171,
                  column: 104,
                  index: 36485,
                },
                identifierName: 'ActivityCreate',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            initialize: 'initialize',
            destroy: 'destroy',
            change: 'change',
            push: 'push',
            touch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/TradeTask/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'edmActions',
              sourceValue: 'emailDirectMarketing/services/actions',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/services/actions/index.ts',
              exportNames: [],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'replace',
              importedName: 'replace',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'CallExpression',
              loc: {
                start: {
                  line: 282,
                  column: 4,
                  index: 8212,
                },
                end: {
                  line: 282,
                  column: 39,
                  index: 8247,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['edmActions'],
          objectPropertyMap: {
            push: 'push',
            replace: 'replace',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/AddressBookManagement/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'edmActions',
              sourceValue: 'emailDirectMarketing/services/actions',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/services/actions/index.ts',
              exportNames: [],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AddressBookManagement',
              loc: {
                start: {
                  line: 383,
                  column: 2,
                  index: 12242,
                },
                end: {
                  line: 383,
                  column: 23,
                  index: 12263,
                },
                identifierName: 'AddressBookManagement',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['edmActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/TemplateManagement/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TemplateManagement',
              loc: {
                start: {
                  line: 232,
                  column: 96,
                  index: 7514,
                },
                end: {
                  line: 232,
                  column: 114,
                  index: 7532,
                },
                identifierName: 'TemplateManagement',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Payment/Balance/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Balance',
              loc: {
                start: {
                  line: 222,
                  column: 2,
                  index: 6814,
                },
                end: {
                  line: 222,
                  column: 9,
                  index: 6821,
                },
                identifierName: 'Balance',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Payment/Wechat/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Wechat',
              loc: {
                start: {
                  line: 202,
                  column: 73,
                  index: 5831,
                },
                end: {
                  line: 202,
                  column: 79,
                  index: 5837,
                },
                identifierName: 'Wechat',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Payment/Result/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ResultPage',
              loc: {
                start: {
                  line: 153,
                  column: 73,
                  index: 4569,
                },
                end: {
                  line: 153,
                  column: 83,
                  index: 4579,
                },
                identifierName: 'ResultPage',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Leads/components/LeadsGeneralInfo/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'LeadsGeneralInfo',
              loc: {
                start: {
                  line: 1505,
                  column: 4,
                  index: 44409,
                },
                end: {
                  line: 1505,
                  column: 20,
                  index: 44425,
                },
                identifierName: 'LeadsGeneralInfo',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/Detail/Content/BriefInfo/BasicMsg/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BasicMsg',
              loc: {
                start: {
                  line: 116,
                  column: 4,
                  index: 4119,
                },
                end: {
                  line: 116,
                  column: 12,
                  index: 4127,
                },
                identifierName: 'BasicMsg',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/ConfirmCancelModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 42,
                  column: 62,
                  index: 1098,
                },
                end: {
                  line: 79,
                  column: 1,
                  index: 2073,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions'],
          objectPropertyMap: {
            goBack: 'goBack',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/MemberExchange/Exchange/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'securityActions',
              sourceValue: 'actions/security',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/security.ts',
              exportNames: [
                'checkABVType',
                'openABVPanel',
                'closeABVPanel',
                'validateCaptchaRequested',
                'validateCaptchaSucceed',
                'validateCaptchaFailed',
                'initValidateCaptcha',
                'setABVVeriType',
                'logSliderVeriInfo',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'vcodeActions',
              sourceValue: 'actions/vcode',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/vcode.ts',
              exportNames: [
                'updateCountDownSeconds',
                'stopVcodeCountDown',
                'sendVcodeMessage',
                'sendVcodeMessageSucceed',
                'sendVcodeMessageFailed',
                'hideVcodeTip',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Exchange',
              loc: {
                start: {
                  line: 194,
                  column: 2,
                  index: 5269,
                },
                end: {
                  line: 194,
                  column: 10,
                  index: 5277,
                },
                identifierName: 'Exchange',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['securityActions', 'userActions', 'vcodeActions'],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/MemberExchange/EdmFissionExchange/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'securityActions',
              sourceValue: 'actions/security',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/security.ts',
              exportNames: [
                'checkABVType',
                'openABVPanel',
                'closeABVPanel',
                'validateCaptchaRequested',
                'validateCaptchaSucceed',
                'validateCaptchaFailed',
                'initValidateCaptcha',
                'setABVVeriType',
                'logSliderVeriInfo',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'vcodeActions',
              sourceValue: 'actions/vcode',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/vcode.ts',
              exportNames: [
                'updateCountDownSeconds',
                'stopVcodeCountDown',
                'sendVcodeMessage',
                'sendVcodeMessageSucceed',
                'sendVcodeMessageFailed',
                'hideVcodeTip',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'EdmFissionExchange',
              loc: {
                start: {
                  line: 228,
                  column: 2,
                  index: 6176,
                },
                end: {
                  line: 228,
                  column: 20,
                  index: 6194,
                },
                identifierName: 'EdmFissionExchange',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['securityActions', 'userActions', 'vcodeActions'],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/comps/ListTable/AdvancedSearchForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AdvancedSearchForm',
              loc: {
                start: {
                  line: 242,
                  column: 4,
                  index: 7528,
                },
                end: {
                  line: 242,
                  column: 22,
                  index: 7546,
                },
                identifierName: 'AdvancedSearchForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            change: 'change',
            initialize: 'initialize',
            touch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/HomePage/components/MarketingModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'mallActions',
              sourceValue: 'foreignTradePlatform/actions/mall',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/mall.ts',
              exportNames: [
                'queryProduct',
                'queryProductSucceed',
                'queryProductFailed',
                'initProduct',
                'getCurrentProduct',
                'getCurrentProductSucceed',
                'getCurrentProductFailed',
                'initCurrencyProduct',
                'getCurrentEdmProduct',
                'getCurrentEdmProductSucceed',
                'getCurrentEdmProductFailed',
                'initCurrencyEdmProduct',
              ],
            },
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'MarketingModal',
              loc: {
                start: {
                  line: 90,
                  column: 2,
                  index: 2649,
                },
                end: {
                  line: 90,
                  column: 16,
                  index: 2663,
                },
                identifierName: 'MarketingModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['mallActions', 'modalActions'],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/Modal/SubAccountModal/SubAccountPassword.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'securityActions',
              sourceValue: 'actions/security',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/security.ts',
              exportNames: [
                'checkABVType',
                'openABVPanel',
                'closeABVPanel',
                'validateCaptchaRequested',
                'validateCaptchaSucceed',
                'validateCaptchaFailed',
                'initValidateCaptcha',
                'setABVVeriType',
                'logSliderVeriInfo',
              ],
            },
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'utilActions',
              sourceValue: 'actions/util',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/util.ts',
              exportNames: [
                'pubKeyRequested',
                'pubKeySucceed',
                'pubKeyFailed',
                'toggleOrderAnnexUpload',
                'setIsMobile',
                'getFirmStatusRequested',
                'getFirmStatusSucceed',
                'getFirmStatusFailed',
                'setPreviewPageId',
                'setCountrys',
                'setProvinces',
                'setLoadAddress',
                'getLocationRequested',
                'getLocationSucceed',
                'getLocationFailed',
                'touchAndChangeAddressFields',
                'resetAddressFieldsThenSetCountry',
              ],
            },
            {
              isNamespace: true,
              localName: 'vcodeActions',
              sourceValue: 'actions/vcode',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/vcode.ts',
              exportNames: [
                'updateCountDownSeconds',
                'stopVcodeCountDown',
                'sendVcodeMessage',
                'sendVcodeMessageSucceed',
                'sendVcodeMessageFailed',
                'hideVcodeTip',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SubAccountPassword',
              loc: {
                start: {
                  line: 260,
                  column: 3,
                  index: 7520,
                },
                end: {
                  line: 260,
                  column: 21,
                  index: 7538,
                },
                identifierName: 'SubAccountPassword',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [
            'securityActions',
            'userActions',
            'utilActions',
            'vcodeActions',
          ],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/HomePage/components/MainAccountFirstStep/components/BindPhoneForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: true,
              localName: 'vcodeActions',
              sourceValue: 'actions/vcode',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/vcode.ts',
              exportNames: [
                'updateCountDownSeconds',
                'stopVcodeCountDown',
                'sendVcodeMessage',
                'sendVcodeMessageSucceed',
                'sendVcodeMessageFailed',
                'hideVcodeTip',
              ],
            },
            {
              isNamespace: true,
              localName: 'bindActions',
              sourceValue: 'actions/bind',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/bind.ts',
              exportNames: [
                'bindRequested',
                'bindSucceed',
                'bindFailed',
                'modifyBindRequested',
                'modifyBindSucceed',
                'modifyBindFailed',
                'setBindStep',
                'resetBindStep',
                'hideBindError',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 30,
                  column: 57,
                  index: 772,
                },
                end: {
                  line: 48,
                  column: 1,
                  index: 1317,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['userActions', 'vcodeActions', 'bindActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/FirstRegisterModal/components/BindContactForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'bindActions',
              sourceValue: 'actions/bind',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/bind.ts',
              exportNames: [
                'bindRequested',
                'bindSucceed',
                'bindFailed',
                'modifyBindRequested',
                'modifyBindSucceed',
                'modifyBindFailed',
                'setBindStep',
                'resetBindStep',
                'hideBindError',
              ],
            },
            {
              isNamespace: true,
              localName: 'vcodeActions',
              sourceValue: 'actions/vcode',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/vcode.ts',
              exportNames: [
                'updateCountDownSeconds',
                'stopVcodeCountDown',
                'sendVcodeMessage',
                'sendVcodeMessageSucceed',
                'sendVcodeMessageFailed',
                'hideVcodeTip',
              ],
            },
            {
              isNamespace: true,
              localName: 'securityActions',
              sourceValue: 'actions/security',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/security.ts',
              exportNames: [
                'checkABVType',
                'openABVPanel',
                'closeABVPanel',
                'validateCaptchaRequested',
                'validateCaptchaSucceed',
                'validateCaptchaFailed',
                'initValidateCaptcha',
                'setABVVeriType',
                'logSliderVeriInfo',
              ],
            },
            {
              isNamespace: true,
              localName: 'submitActions',
              sourceValue: 'actions/submit',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/submit.ts',
              exportNames: [
                'submitRequested',
                'submitSucceed',
                'submitFailed',
                'resetSubmit',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 93,
                  column: 66,
                  index: 2751,
                },
                end: {
                  line: 270,
                  column: 1,
                  index: 7924,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [
            'bindActions',
            'vcodeActions',
            'securityActions',
            'submitActions',
          ],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/HomePage/components/MainAccountFirstStep/components/AdditionalForm/AgreementForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'connectGlobalProfile',
              loc: {
                start: {
                  line: 136,
                  column: 4,
                  index: 3634,
                },
                end: {
                  line: 136,
                  column: 24,
                  index: 3654,
                },
                identifierName: 'connectGlobalProfile',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/tools/BusinessCardModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'submit',
              importedName: 'submit',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BusinessCardRecognition',
              loc: {
                start: {
                  line: 291,
                  column: 3,
                  index: 7619,
                },
                end: {
                  line: 291,
                  column: 26,
                  index: 7642,
                },
                identifierName: 'BusinessCardRecognition',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            startSubmit: 'submit',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/tools/SideFunctions/components/GlobalNotification/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'GlobalNotification',
              loc: {
                start: {
                  line: 133,
                  column: 3,
                  index: 3561,
                },
                end: {
                  line: 133,
                  column: 21,
                  index: 3579,
                },
                identifierName: 'GlobalNotification',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
            initialize: 'initialize',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Product/Components/ProductMailSend/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'crmEmailActions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ProductMailSend',
              loc: {
                start: {
                  line: 99,
                  column: 2,
                  index: 2417,
                },
                end: {
                  line: 99,
                  column: 17,
                  index: 2432,
                },
                identifierName: 'ProductMailSend',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['crmEmailActions'],
          objectPropertyMap: {
            routerPush: 'push',
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Agenda/AdvancedScreen/Content/Form/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'arrayRemove',
              importedName: 'arrayRemove',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'CustomerAdvancedScreenContentForm',
              loc: {
                start: {
                  line: 101,
                  column: 2,
                  index: 3114,
                },
                end: {
                  line: 101,
                  column: 35,
                  index: 3147,
                },
                identifierName: 'CustomerAdvancedScreenContentForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
            removeArrayField: 'arrayRemove',
            navRouter: 'push',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/BusinessHome/components/List/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BatchActions',
              loc: {
                start: {
                  line: 147,
                  column: 2,
                  index: 4511,
                },
                end: {
                  line: 147,
                  column: 14,
                  index: 4523,
                },
                identifierName: 'BatchActions',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            change: 'change',
            push: 'push',
          },
        },
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Table',
              loc: {
                start: {
                  line: 743,
                  column: 2,
                  index: 19087,
                },
                end: {
                  line: 743,
                  column: 7,
                  index: 19092,
                },
                identifierName: 'Table',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            updateFilterCondition: 'updateFilterCondition',
            change: 'change',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/BusinessDetail/components/TopBlock/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TopBlock',
              loc: {
                start: {
                  line: 422,
                  column: 2,
                  index: 12911,
                },
                end: {
                  line: 422,
                  column: 10,
                  index: 12919,
                },
                identifierName: 'TopBlock',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/AdvancedScreen/Content/Form/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'arrayRemove',
              importedName: 'arrayRemove',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'CustomerAdvancedScreenContentForm',
              loc: {
                start: {
                  line: 100,
                  column: 2,
                  index: 3070,
                },
                end: {
                  line: 100,
                  column: 35,
                  index: 3103,
                },
                identifierName: 'CustomerAdvancedScreenContentForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
            removeArrayField: 'arrayRemove',
            navRouter: 'push',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/Content/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Content',
              loc: {
                start: {
                  line: 427,
                  column: 2,
                  index: 12281,
                },
                end: {
                  line: 427,
                  column: 9,
                  index: 12288,
                },
                identifierName: 'Content',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setFormData: 'initialize',
            routerPush: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/AdvancedScreen/Content/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'quotationActions',
              sourceValue: 'foreignTradePlatform/actions/quotation',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/quotation/index.ts',
              exportNames: [
                'updateQuotationList',
                'updateQuotationListSuccess',
                'updateQuotationListError',
              ],
            },
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AdvancedScreenContent',
              loc: {
                start: {
                  line: 107,
                  column: 2,
                  index: 2718,
                },
                end: {
                  line: 107,
                  column: 23,
                  index: 2739,
                },
                identifierName: 'AdvancedScreenContent',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['quotationActions'],
          objectPropertyMap: {
            updateFilterCondition: 'updateFilterCondition',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/Account/AccountEditor/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AccountEditor',
              loc: {
                start: {
                  line: 331,
                  column: 2,
                  index: 9081,
                },
                end: {
                  line: 331,
                  column: 15,
                  index: 9094,
                },
                identifierName: 'AccountEditor',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/FirmSetting/FirmTitle/FirmInfoBlock/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'uploadActions',
              sourceValue: 'foreignTradePlatform/actions/upload',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/upload.ts',
              exportNames: [
                'uploadRequest',
                'uploadSucceed',
                'uploadFailed',
                'uploadInit',
              ],
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'FirmInfoBlock',
              loc: {
                start: {
                  line: 482,
                  column: 4,
                  index: 13587,
                },
                end: {
                  line: 482,
                  column: 17,
                  index: 13600,
                },
                identifierName: 'FirmInfoBlock',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['uploadActions'],
          objectPropertyMap: {
            initialize: 'initialize',
            formFieldTouch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/FirmSetting/pubInfo/components/pubCard/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 34,
                  column: 2,
                  index: 844,
                },
                end: {
                  line: 73,
                  column: 1,
                  index: 1923,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/pubFormModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 70,
                  column: 3,
                  index: 1985,
                },
                end: {
                  line: 232,
                  column: 2,
                  index: 5954,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            formFieldTouch: 'touch',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/UserCenter/component/BasicInfo/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'userActions',
              sourceValue: 'actions/user',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/user.ts',
              exportNames: [
                'getUserFlowId',
                'getUserFlowIdAndCaptcha',
                'getUserFlowIdSucceed',
                'getUserFlowIdFailed',
                'initUserFlowId',
                'getUserCaptcha',
                'getUserCaptchaSucceed',
                'getUserCaptchaFailed',
                'initUserCaptcha',
                'verifyMfaRequested',
                'verifyMfaSucceed',
                'verifyMfaFailed',
                'initVerifyMfa',
                'setAuthId',
                'resetAuthId',
                'executeAuthIdCallBackRequested',
                'executeAuthIdCallBackSucceed',
                'executeAuthIdCallBackFailed',
                'sendMfaMessageRequested',
                'getMfaCaptchaRequested',
                'getMfaCaptchaSucceed',
                'getMfaCaptchaFailed',
                'initMfaCaptcha',
                'getWhiteListRequested',
                'getWhiteListSucceed',
                'getWhiteListFailed',
                'getWhiteListInit',
                'setMfaJson',
                'resetMfaJson',
                'queryIndustryRequested',
                'queryIndustrySucceed',
                'queryIndustryFailed',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BasicInfo',
              loc: {
                start: {
                  line: 287,
                  column: 16,
                  index: 7702,
                },
                end: {
                  line: 287,
                  column: 25,
                  index: 7711,
                },
                identifierName: 'BasicInfo',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['userActions'],
          objectPropertyMap: {
            routerPush: 'push',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/Content/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Content',
              loc: {
                start: {
                  line: 438,
                  column: 2,
                  index: 12350,
                },
                end: {
                  line: 438,
                  column: 9,
                  index: 12357,
                },
                identifierName: 'Content',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setFormData: 'initialize',
            routerPush: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/AdvancedScreen/Content/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'orderActions',
              sourceValue: 'foreignTradePlatform/actions/order',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/order/index.ts',
              exportNames: [
                'updateOrderList',
                'updateOrderListSuccess',
                'updateOrderListError',
              ],
            },
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AdvancedScreenContent',
              loc: {
                start: {
                  line: 111,
                  column: 2,
                  index: 2758,
                },
                end: {
                  line: 111,
                  column: 23,
                  index: 2779,
                },
                identifierName: 'AdvancedScreenContent',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['orderActions'],
          objectPropertyMap: {
            updateFilterCondition: 'updateFilterCondition',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/TradeTaskMent/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TradeTaskMent',
              loc: {
                start: {
                  line: 204,
                  column: 28,
                  index: 7053,
                },
                end: {
                  line: 204,
                  column: 41,
                  index: 7066,
                },
                identifierName: 'TradeTaskMent',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/StepOne/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'StepOne',
              loc: {
                start: {
                  line: 53,
                  column: 48,
                  index: 1487,
                },
                end: {
                  line: 53,
                  column: 55,
                  index: 1494,
                },
                identifierName: 'StepOne',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/StepTwo/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'StepTwo',
              loc: {
                start: {
                  line: 323,
                  column: 69,
                  index: 9619,
                },
                end: {
                  line: 323,
                  column: 76,
                  index: 9626,
                },
                identifierName: 'StepTwo',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            push: 'push',
            goBack: 'goBack',
            change: 'change',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/StepThree/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'destroy',
              importedName: 'destroy',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'submit',
              importedName: 'submit',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'unregisterField',
              importedName: 'unregisterField',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'untouch',
              importedName: 'untouch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'StepThree',
              loc: {
                start: {
                  line: 677,
                  column: 71,
                  index: 21701,
                },
                end: {
                  line: 677,
                  column: 80,
                  index: 21710,
                },
                identifierName: 'StepThree',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            destroy: 'destroy',
            touch: 'touch',
            change: 'change',
            submit: 'submit',
            unregisterField: 'unregisterField',
            untouch: 'untouch',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/components/SendTestEmailModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SendTestEmailModal',
              loc: {
                start: {
                  line: 293,
                  column: 48,
                  index: 8274,
                },
                end: {
                  line: 293,
                  column: 66,
                  index: 8292,
                },
                identifierName: 'SendTestEmailModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/TradeTaskDetail/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'edmActions',
              sourceValue: 'emailDirectMarketing/services/actions',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/services/actions/index.ts',
              exportNames: [],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'replace',
              importedName: 'replace',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TradeTaskDetail',
              loc: {
                start: {
                  line: 57,
                  column: 4,
                  index: 1899,
                },
                end: {
                  line: 57,
                  column: 19,
                  index: 1914,
                },
                identifierName: 'TradeTaskDetail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['edmActions'],
          objectPropertyMap: {
            push: 'push',
            replace: 'replace',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/businessComponents/ProtoModal/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'submitActions',
              sourceValue: 'actions/submit',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/submit.ts',
              exportNames: [
                'submitRequested',
                'submitSucceed',
                'submitFailed',
                'resetSubmit',
              ],
            },
            {
              isNamespace: true,
              localName: 'meActions',
              sourceValue: 'actions/me',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/me.ts',
              exportNames: [
                'getProfileRequested',
                'getProfileSucceed',
                'getProfileFailed',
                'setProfile',
                'accountRequested',
                'accountSucceed',
                'accountFailed',
                'hideAccountError',
                'userPowerRequested',
                'userPowerSucceed',
                'userPowerFailed',
                'getDepositTodoRequested',
                'getDepositTodoSucceed',
                'getDepositTodoFailed',
                'setXtMethod',
                'setTransferNotice',
                'reset',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'getProfileRequested',
              importedName: 'getProfileRequested',
              sourceValue: 'actions/me',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/me.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ProtoSignModal',
              loc: {
                start: {
                  line: 226,
                  column: 1,
                  index: 7107,
                },
                end: {
                  line: 226,
                  column: 15,
                  index: 7121,
                },
                identifierName: 'ProtoSignModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['submitActions', 'meActions'],
          objectPropertyMap: {
            push: 'push',
            getProfileRequested: 'getProfileRequested',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Leads/HomePage/components/OperationBar/SendEmail.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SendEmail',
              loc: {
                start: {
                  line: 71,
                  column: 4,
                  index: 1906,
                },
                end: {
                  line: 71,
                  column: 13,
                  index: 1915,
                },
                identifierName: 'SendEmail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Logistics/DetailPage/components/GeneralInfo/BasicMsg.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BasicMsg',
              loc: {
                start: {
                  line: 70,
                  column: 4,
                  index: 2410,
                },
                end: {
                  line: 70,
                  column: 12,
                  index: 2418,
                },
                identifierName: 'BasicMsg',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/HomePage/components/SetPasswordOperate/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'modalActions',
              sourceValue: 'actions/modal',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/modal.ts',
              exportNames: [
                'toggleModalStatus',
                'toggleModalWithCallback',
                'toggleGlobalPriorityModalStatus',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SetPasswordOperate',
              loc: {
                start: {
                  line: 36,
                  column: 2,
                  index: 738,
                },
                end: {
                  line: 36,
                  column: 20,
                  index: 756,
                },
                identifierName: 'SetPasswordOperate',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['modalActions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/Modal/SubAccountModal/component/ValidaInput/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ValidaInput',
              loc: {
                start: {
                  line: 90,
                  column: 3,
                  index: 2235,
                },
                end: {
                  line: 90,
                  column: 14,
                  index: 2246,
                },
                identifierName: 'ValidaInput',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/tools/SideFunctions/components/HelpPanel/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'getTagFaqRequested',
              importedName: 'getTagFaqRequested',
              sourceValue: 'actions/faq',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/faq.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'HelpPanel',
              loc: {
                start: {
                  line: 97,
                  column: 2,
                  index: 2335,
                },
                end: {
                  line: 97,
                  column: 11,
                  index: 2344,
                },
                identifierName: 'HelpPanel',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            getTagFaqRequested: 'getTagFaqRequested',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/tools/SideFunctions/components/AdviseModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AdviseModal',
              loc: {
                start: {
                  line: 148,
                  column: 3,
                  index: 4078,
                },
                end: {
                  line: 148,
                  column: 14,
                  index: 4089,
                },
                identifierName: 'AdviseModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/views/Dashboard/SendForm/FilterForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Filter',
              loc: {
                start: {
                  line: 110,
                  column: 72,
                  index: 3161,
                },
                end: {
                  line: 110,
                  column: 78,
                  index: 3167,
                },
                identifierName: 'Filter',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            change: 'change',
            push: 'push',
            touch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/BusinessHome/components/List/components/DrawerInfo/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 34,
                  column: 2,
                  index: 974,
                },
                end: {
                  line: 89,
                  column: 1,
                  index: 2314,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            nav: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/components/modals/LossOrderReasonModal.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'CallExpression',
              loc: {
                start: {
                  line: 46,
                  column: 1,
                  index: 1593,
                },
                end: {
                  line: 91,
                  column: 2,
                  index: 2829,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            touch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/components/ModuleRelatedInfo/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ModuleRelatedContainer',
              loc: {
                start: {
                  line: 608,
                  column: 2,
                  index: 17087,
                },
                end: {
                  line: 608,
                  column: 24,
                  index: 17109,
                },
                identifierName: 'ModuleRelatedContainer',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
            change: 'change',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/AgendaFormModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AgendaFormModal',
              loc: {
                start: {
                  line: 72,
                  column: 2,
                  index: 1993,
                },
                end: {
                  line: 72,
                  column: 17,
                  index: 2008,
                },
                identifierName: 'AgendaFormModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/AdvancedScreen/Content/Form/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'arrayRemove',
              importedName: 'arrayRemove',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'QuotationAdvancedScreenContentForm',
              loc: {
                start: {
                  line: 116,
                  column: 2,
                  index: 3025,
                },
                end: {
                  line: 116,
                  column: 36,
                  index: 3059,
                },
                identifierName: 'QuotationAdvancedScreenContentForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
            removeArrayField: 'arrayRemove',
            navRouter: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/Form/Segments/BeneficiaryAddressBeneficiaryAddressSegment/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'metaActions',
              sourceValue: 'actions/meta',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/meta.ts',
              exportNames: [
                'fetchMetaRequested',
                'fetchMetaSucceed',
                'fetchMetaFailed',
                'resetFetchMeta',
                'hideFetchMetaError',
              ],
            },
            {
              isNamespace: true,
              localName: 'statusActions',
              sourceValue: 'actions/status',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/status.ts',
              exportNames: ['toggleEntityStatus'],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 84,
                  column: 67,
                  index: 2364,
                },
                end: {
                  line: 269,
                  column: 1,
                  index: 8034,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['metaActions', 'statusActions'],
          objectPropertyMap: {
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/hoc/withAddress.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'utilActions',
              sourceValue: 'actions/util',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/util.ts',
              exportNames: [
                'pubKeyRequested',
                'pubKeySucceed',
                'pubKeyFailed',
                'toggleOrderAnnexUpload',
                'setIsMobile',
                'getFirmStatusRequested',
                'getFirmStatusSucceed',
                'getFirmStatusFailed',
                'setPreviewPageId',
                'setCountrys',
                'setProvinces',
                'setLoadAddress',
                'getLocationRequested',
                'getLocationSucceed',
                'getLocationFailed',
                'touchAndChangeAddressFields',
                'resetAddressFieldsThenSetCountry',
              ],
            },
            {
              isNamespace: true,
              localName: 'submitActions',
              sourceValue: 'actions/submit',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/submit.ts',
              exportNames: [
                'submitRequested',
                'submitSucceed',
                'submitFailed',
                'resetSubmit',
              ],
            },
            {
              isNamespace: false,
              localName: 'destroy',
              importedName: 'destroy',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 42,
                  column: 57,
                  index: 1262,
                },
                end: {
                  line: 80,
                  column: 3,
                  index: 2663,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['utilActions', 'submitActions'],
          objectPropertyMap: {
            destroy: 'destroy',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Setting/Account/AccountDetail/components/TopBlock/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TopBlock',
              loc: {
                start: {
                  line: 179,
                  column: 2,
                  index: 5525,
                },
                end: {
                  line: 179,
                  column: 10,
                  index: 5533,
                },
                identifierName: 'TopBlock',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            nav: 'push',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/AdvancedScreen/Content/Form/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'arrayRemove',
              importedName: 'arrayRemove',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'OrderAdvancedScreenContentForm',
              loc: {
                start: {
                  line: 113,
                  column: 2,
                  index: 2936,
                },
                end: {
                  line: 113,
                  column: 32,
                  index: 2966,
                },
                identifierName: 'OrderAdvancedScreenContentForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
            removeArrayField: 'arrayRemove',
            navRouter: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/TradeTaskMent/components/DataTable/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'EDMTaskTable',
              loc: {
                start: {
                  line: 313,
                  column: 60,
                  index: 9868,
                },
                end: {
                  line: 313,
                  column: 72,
                  index: 9880,
                },
                identifierName: 'EDMTaskTable',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/StepOne/StepOneForm.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'reset',
              importedName: 'reset',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'StepOneForm',
              loc: {
                start: {
                  line: 288,
                  column: 71,
                  index: 9502,
                },
                end: {
                  line: 288,
                  column: 82,
                  index: 9513,
                },
                identifierName: 'StepOneForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            change: 'change',
            reset: 'reset',
            push: 'push',
            initialize: 'initialize',
            touch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/pages/ActivityCreate/StepThree/TimeModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Timing',
              loc: {
                start: {
                  line: 112,
                  column: 71,
                  index: 3635,
                },
                end: {
                  line: 112,
                  column: 77,
                  index: 3641,
                },
                identifierName: 'Timing',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            change: 'change',
            push: 'push',
            touch: 'touch',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/views/Bind/BindForm/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'touch',
              importedName: 'touch',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BindForm',
              loc: {
                start: {
                  line: 756,
                  column: 2,
                  index: 22465,
                },
                end: {
                  line: 756,
                  column: 10,
                  index: 22473,
                },
                identifierName: 'BindForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {
            change: 'change',
            initialize: 'initialize',
            touch: 'touch',
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/businessComponents/Certification/Certification.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Certification',
              loc: {
                start: {
                  line: 292,
                  column: 4,
                  index: 7800,
                },
                end: {
                  line: 292,
                  column: 17,
                  index: 7813,
                },
                identifierName: 'Certification',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
            push: 'push',
          },
        },
        {
          actionsDependencies: [],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Certification',
              loc: {
                start: {
                  line: 292,
                  column: 4,
                  index: 7800,
                },
                end: {
                  line: 292,
                  column: 17,
                  index: 7813,
                },
                identifierName: 'Certification',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Customer/HomePage/components/OperationBar/SendEmail.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'SendEmail',
              loc: {
                start: {
                  line: 94,
                  column: 2,
                  index: 2752,
                },
                end: {
                  line: 94,
                  column: 11,
                  index: 2761,
                },
                identifierName: 'SendEmail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/components/ResponsibleUser/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ResponsibleUser',
              loc: {
                start: {
                  line: 79,
                  column: 2,
                  index: 2094,
                },
                end: {
                  line: 79,
                  column: 17,
                  index: 2109,
                },
                identifierName: 'ResponsibleUser',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/Detail/Content/BriefInfo/BasicMsg/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BasicMsg',
              loc: {
                start: {
                  line: 95,
                  column: 4,
                  index: 3385,
                },
                end: {
                  line: 95,
                  column: 12,
                  index: 3393,
                },
                identifierName: 'BasicMsg',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/emailDirectMarketing/components/BindEmailHOC/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'actions',
              sourceValue: 'crmEmail/actions/index',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/actions/index.ts',
              exportNames: [
                'setAlert',
                'setAccount',
                'setTabData',
                'clearTabData',
                'setUserSelectAccData',
                'setStaffSelect',
                'setIsMainAccount',
                'clearStaffSelect',
                'setUserAccount',
                'clearAccount',
                'addOpenPage',
                'removeOpenPage',
                'setOpenPage',
                'filterOpenPage',
                'addCache',
                'removeCache',
                'clearCache',
                'setCacheLoading',
                'setCacheError',
                'setModal',
                'setSuccessPage',
                'setModalWithCallback',
                'queryGeneral',
                'resetGeneral',
                'queryGeneralSuccess',
                'queryGeneralFailed',
                'queryGeneralClearData',
                'selectMail',
                'cancelSelectMail',
                'resetSelectMail',
                'uploadAnnex',
                'uploadAnnexSuccess',
                'uploadAnnexFailed',
                'deleteAnnex',
                'clearAnnex',
                'uploadImage',
                'uploadImageSuccess',
                'uploadImageFailed',
                'clearImage',
                'previewImage',
                'previewImageSuccess',
                'previewImageFailed',
                'isConnect',
                'setConnectLoading',
                'polling',
                'stopPolling',
                'queryMailList',
                'queryMailSuccess',
                'queryMailListFailed',
                'setDashboardUrl',
                'addMailCache',
                'removeMailCache',
                'clearMailCache',
                'resetCrmEmail',
                'modifyMailListFlag',
                'modifyMailDetailFlag',
                'debounceEmailDetail',
                'setEmailDomain',
                'setEmailQueryParams',
              ],
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ComponentWithBindEmail',
              loc: {
                start: {
                  line: 45,
                  column: 53,
                  index: 1555,
                },
                end: {
                  line: 45,
                  column: 75,
                  index: 1577,
                },
                identifierName: 'ComponentWithBindEmail',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['actions'],
          objectPropertyMap: {},
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Customer/components/Table/index.tsx',
      localConnect: 'connect',
      localCompose: 'compose',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BatchActions',
              loc: {
                start: {
                  line: 274,
                  column: 2,
                  index: 7670,
                },
                end: {
                  line: 274,
                  column: 14,
                  index: 7682,
                },
                identifierName: 'BatchActions',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
            change: 'change',
          },
        },
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'updateFilterCondition',
              importedName: 'updateFilterCondition',
              sourceValue: 'foreignTradePlatform/actions/filter',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/filter.ts',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'Table',
              loc: {
                start: {
                  line: 749,
                  column: 2,
                  index: 19385,
                },
                end: {
                  line: 749,
                  column: 7,
                  index: 19390,
                },
                identifierName: 'Table',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            updateFilterCondition: 'updateFilterCondition',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Customer/components/Table/components/CustomerInfoDrawer/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'sentryActions',
              sourceValue: 'actions/sentry',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/actions/sentry.ts',
              exportNames: ['setSentryData', 'getSentryData', 'delSentryData'],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ArrowFunctionExpression',
              loc: {
                start: {
                  line: 51,
                  column: 2,
                  index: 2073,
                },
                end: {
                  line: 187,
                  column: 1,
                  index: 6457,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['sentryActions'],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Leads/DetailPage/components/DynamicInfo/CreateAgenda/components/AgendaForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'uploadActions',
              sourceValue: 'foreignTradePlatform/actions/upload',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/upload.ts',
              exportNames: [
                'uploadRequest',
                'uploadSucceed',
                'uploadFailed',
                'uploadInit',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AgendaForm',
              loc: {
                start: {
                  line: 306,
                  column: 53,
                  index: 8753,
                },
                end: {
                  line: 306,
                  column: 63,
                  index: 8763,
                },
                identifierName: 'AgendaForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['uploadActions'],
          objectPropertyMap: {
            change: 'change',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Agenda/AdvancedScreen/Content/Form/items/ReferenceType.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ReferenceTypes',
              loc: {
                start: {
                  line: 49,
                  column: 2,
                  index: 1202,
                },
                end: {
                  line: 49,
                  column: 16,
                  index: 1216,
                },
                identifierName: 'ReferenceTypes',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            change: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Agenda/AdvancedScreen/Content/Form/items/TimerPicker.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'TimePicker',
              loc: {
                start: {
                  line: 114,
                  column: 2,
                  index: 3332,
                },
                end: {
                  line: 114,
                  column: 12,
                  index: 3342,
                },
                identifierName: 'TimePicker',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/BusinessHome/components/Board/components/BusinessItem/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BusinessItem',
              loc: {
                start: {
                  line: 86,
                  column: 2,
                  index: 2298,
                },
                end: {
                  line: 86,
                  column: 14,
                  index: 2310,
                },
                identifierName: 'BusinessItem',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            push: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Business/AdvancedScreen/Content/Form/items/CreatedTime.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'CreatedTime',
              loc: {
                start: {
                  line: 102,
                  column: 2,
                  index: 3027,
                },
                end: {
                  line: 102,
                  column: 13,
                  index: 3038,
                },
                identifierName: 'CreatedTime',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/components/SideDrawBriefInfo/DrawerTitle.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'DrawerTitle',
              loc: {
                start: {
                  line: 152,
                  column: 4,
                  index: 3971,
                },
                end: {
                  line: 152,
                  column: 15,
                  index: 3982,
                },
                identifierName: 'DrawerTitle',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            navigate: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/AgendaFormModal/components/AgendaForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'uploadActions',
              sourceValue: 'foreignTradePlatform/actions/upload',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/upload.ts',
              exportNames: [
                'uploadRequest',
                'uploadSucceed',
                'uploadFailed',
                'uploadInit',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AgendaForm',
              loc: {
                start: {
                  line: 515,
                  column: 66,
                  index: 15634,
                },
                end: {
                  line: 515,
                  column: 76,
                  index: 15644,
                },
                identifierName: 'AgendaForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['uploadActions'],
          objectPropertyMap: {
            change: 'change',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/components/Modal/index.js',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 26,
                  column: 41,
                  index: 829,
                },
                end: {
                  line: 55,
                  column: 1,
                  index: 1776,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            goBack: 'goBack',
          },
        },
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 63,
                  column: 44,
                  index: 1921,
                },
                end: {
                  line: 135,
                  column: 1,
                  index: 3520,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            goBack: 'goBack',
          },
        },
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'ClassBody',
              loc: {
                start: {
                  line: 142,
                  column: 47,
                  index: 3667,
                },
                end: {
                  line: 194,
                  column: 1,
                  index: 4907,
                },
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            goBack: 'goBack',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/components/SideDrawBriefInfo/DrawerTitle.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'DrawerTitle',
              loc: {
                start: {
                  line: 150,
                  column: 4,
                  index: 4094,
                },
                end: {
                  line: 150,
                  column: 15,
                  index: 4105,
                },
                identifierName: 'DrawerTitle',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            navigate: 'push',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Customer/components/modals/ContactFormModal/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ContactFormModal',
              loc: {
                start: {
                  line: 149,
                  column: 3,
                  index: 4334,
                },
                end: {
                  line: 149,
                  column: 19,
                  index: 4350,
                },
                identifierName: 'ContactFormModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/AddNewModal/AddCustomer/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'uploadActions',
              sourceValue: 'foreignTradePlatform/actions/upload',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/upload.ts',
              exportNames: [
                'uploadRequest',
                'uploadSucceed',
                'uploadFailed',
                'uploadInit',
              ],
            },
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'goBack',
              importedName: 'goBack',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AddCustomer',
              loc: {
                start: {
                  line: 184,
                  column: 4,
                  index: 5866,
                },
                end: {
                  line: 184,
                  column: 15,
                  index: 5877,
                },
                identifierName: 'AddCustomer',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['uploadActions'],
          objectPropertyMap: {
            push: 'push',
            goBack: 'goBack',
            change: 'change',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/modals/AddNewModal/AddContact/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'ContactFormModal',
              loc: {
                start: {
                  line: 106,
                  column: 3,
                  index: 3011,
                },
                end: {
                  line: 106,
                  column: 19,
                  index: 3027,
                },
                identifierName: 'ContactFormModal',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Customer/CustomerDetail/components/DynamicInfo/CreateAgenda/components/AgendaForm/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: true,
              localName: 'uploadActions',
              sourceValue: 'foreignTradePlatform/actions/upload',
              dependencyPath:
                '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/actions/upload.ts',
              exportNames: [
                'uploadRequest',
                'uploadSucceed',
                'uploadFailed',
                'uploadInit',
              ],
            },
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
            {
              isNamespace: false,
              localName: 'initialize',
              importedName: 'initialize',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'AgendaForm',
              loc: {
                start: {
                  line: 304,
                  column: 53,
                  index: 8833,
                },
                end: {
                  line: 304,
                  column: 63,
                  index: 8843,
                },
                identifierName: 'AgendaForm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: ['uploadActions'],
          objectPropertyMap: {
            change: 'change',
            initialize: 'initialize',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/components/AdvancedScreenForm/RangeDatePicker/index.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'RangeDatePicker',
              loc: {
                start: {
                  line: 125,
                  column: 2,
                  index: 3590,
                },
                end: {
                  line: 125,
                  column: 17,
                  index: 3605,
                },
                identifierName: 'RangeDatePicker',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Quotation/AdvancedScreen/Content/Form/items/FirmTitle.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'FirmTitle',
              loc: {
                start: {
                  line: 62,
                  column: 2,
                  index: 1621,
                },
                end: {
                  line: 62,
                  column: 11,
                  index: 1630,
                },
                identifierName: 'FirmTitle',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/views/Order/AdvancedScreen/Content/Form/items/FirmTitle.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'change',
              importedName: 'change',
              sourceValue: 'redux-form/es/immutable',
              dependencyPath: 'redux-form/es/immutable',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'FirmTitle',
              loc: {
                start: {
                  line: 62,
                  column: 2,
                  index: 1621,
                },
                end: {
                  line: 62,
                  column: 11,
                  index: 1630,
                },
                identifierName: 'FirmTitle',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            setNormalFormField: 'change',
          },
        },
      ],
    },
    {
      filePath:
        '/Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/foreignTradePlatform/Customer/HomePage/components/customerManagement/components/BuyVipConfirm.tsx',
      localConnect: 'connect',
      localCompose: '',
      groups: [
        {
          actionsDependencies: [
            {
              isNamespace: false,
              localName: 'push',
              importedName: 'push',
              sourceValue: 'react-router-redux',
              dependencyPath: 'react-router-redux',
            },
          ],
          actionsComponents: [
            {
              type: 'Identifier',
              name: 'BuyVipConfirm',
              loc: {
                start: {
                  line: 39,
                  column: 2,
                  index: 914,
                },
                end: {
                  line: 39,
                  column: 15,
                  index: 927,
                },
                identifierName: 'BuyVipConfirm',
              },
            },
          ],
          unknownElements: [],
          spreadElementNames: [],
          objectPropertyMap: {
            routerPush: 'push',
          },
        },
      ],
    },
  ],
}
