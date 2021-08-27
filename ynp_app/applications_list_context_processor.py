def applications_list(request):
    return {
        'applications_list': [
            {
                "id": "calculator",
                "name": "Калькулятор"
            }
        ],
    }