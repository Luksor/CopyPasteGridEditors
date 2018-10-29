angular.module('umbraco').controller('Our.Umbraco.CopyPasteGridEditors',
	['$scope', '$controller', 'localStorageService', '$element',
		function ($scope, $controller, localStorageService, $element) {

			var gridClipboardAlias = "grid-clipboard";

			angular.extend(this, $controller('Umbraco.PropertyEditors.GridController', { $scope: $scope, $element: $element }));

			$scope.copy = function (control) {
				if (!Array.isArray(localStorageService.get(gridClipboardAlias))) {
					localStorageService.set(gridClipboardAlias, []);
				}

				var newClipboard = localStorageService.get(gridClipboardAlias);

				newClipboard.push(control);

				if (newClipboard.length > 10) {
					newClipboard.splice(0, newClipboard.length - 10);
				}

				localStorageService.set(gridClipboardAlias, newClipboard);

				setClipboard();
			}

			var setClipboard = function () {
				$scope.clipboard = localStorageService.get(gridClipboardAlias);
				if (!Array.isArray($scope.clipboard)) {
					$scope.clipboard = [];
				}
			}

			setClipboard();

			$scope.allowedEditorsInClipboard = function (cell) {
				var allowedEditors = cell.$allowedEditors.map(function (editor) { return editor.alias; });
				return $scope.clipboard.filter(function (control) {
					return allowedEditors.indexOf(control.editor.alias) > -1;
				});
			}

			$scope.paste = function (event, cell, index, copied) {
				if (typeof (copied) == "undefined") {
					// should be first allowed editor
					var allowedEditors = $scope.allowedEditorsInClipboard(cell);
					if (allowedEditors.length == 0) {
						return false;
					}
					else {
						copied = allowedEditors[allowedEditors.length - 1];
					}
				}

				var newControl = $.extend({}, copied);
				if (copied && copied.editor) {

					if (index === undefined) {
						index = cell.controls.length;
					}

					newControl.active = true;
					$scope.initControl(newControl, index + 1);
					cell.controls.push(newControl);
				}
			}


			console.log("copypaste");
		}]);

console.log("cpge");

angular.module('umbraco.services').config([
	'$httpProvider',
	function ($httpProvider) {

		$httpProvider.interceptors.push(function ($q) {
			return {
				'request': function (request) {

					// Redirect any requests for the help page, to team.ecreo.dk/support
					if (request.url.startsWith("views/propertyeditors/grid/grid.html"))
						request.url = "../App_Plugins/CopyPasteGridEditors/copypastegrid.html";

					return request || $q.when(request);
				}
			};
		});

	}]);