# # Every team fills in the commands for their own stack.
# # The CI pipeline calls these targets, so the names must not change.
# #
# # Examples:
# #   Node    install: npm ci          test: npm test        build: npm run build
# #   Python  install: pip install -r requirements.txt
# #                                    test: pytest          build: echo "no build step"
# #   Java    install: ./mvnw -B dependency:go-offline
# #                                    test: ./mvnw test     build: ./mvnw package

.PHONY: install test build run

install:
	npm install

test:
	@echo Running React build test...
	npm run build

build:
	@echo Building React project...
	npm run build

run:
	@echo Starting React development server...
	npm run dev